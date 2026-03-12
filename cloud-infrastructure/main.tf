terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.54"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.7"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  subscription_id                 = var.subscription_id
  tenant_id                       = var.tenant_id
  client_id                       = var.default_client_id
  client_secret                   = var.default_client_secret
  resource_provider_registrations = "none"
  features {}
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project}-${local.suffix}-001"
  location = lower(var.location)
}

# ───────────────────────────────── ①  Microsoft Entra External Identity ─────────────────────────
# See entra-external.tf for External ID tenant configuration
# The tenant is created via Azure REST API using local-exec provisioner

# ───────────────────────────────── ②  Azure Web App (Free tier)  ───────────────────────────

# App Service Plan (Linux, Free tier)
resource "azurerm_service_plan" "asp" {
  name                = "asp-${var.project}-${local.suffix}-001"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "F1" # Free tier
}

# App Service for .NET 10 Web API
resource "azurerm_linux_web_app" "api" {
  name                = "app-${var.project}-api-${local.suffix}-001"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {
    always_on = false # Must be false for Free tier

    application_stack {
      dotnet_version = "10.0"
    }

    cors {
      allowed_origins     = ["https://${var.spa_domain}"]
      support_credentials = true
    }
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT"                = var.environment == "prod" ? "Production" : "Development"
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.ai.connection_string
  }

  https_only = true

  identity {
    type = "SystemAssigned"
  }
}

# ──────────────────────────────── ③  Azure SQL Database (Free tier) ────────────────

# SQL Server
resource "azurerm_mssql_server" "sql" {
  name                         = "sql-${var.project}-${local.suffix}-001"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_user
  administrator_login_password = var.sql_admin_password
  minimum_tls_version          = "1.2"

  azuread_administrator {
    login_username = "AzureAD Admin"
    object_id      = azurerm_linux_web_app.api.identity[0].principal_id
  }

  public_network_access_enabled = true
}

# SQL Database (Free tier)
resource "azurerm_mssql_database" "db" {
  name           = "sqldb-${var.project}-${local.suffix}-001"
  server_id      = azurerm_mssql_server.sql.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb    = 2
  sku_name       = "Basic"
  zone_redundant = false

  lifecycle {
    prevent_destroy = false
  }
}

# Firewall rule to allow Azure services
resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.sql.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# ──────────────────────────────── ④  Cosmos DB (Free tier)  ───────────────────


# ──────────────────────────────── ⑤  Application Insights  ───────────────────

# Log Analytics Workspace (required for Application Insights)
resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-${var.project}-${local.suffix}-001"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# Application Insights
resource "azurerm_application_insights" "ai" {
  name                = "ai-${var.project}-${local.suffix}-001"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  application_type    = "web"
}

# Retrieve information about the currently authenticated Azure client/account used by Terraform
# Required for Key Vault and other AAD-aware resources
data "azurerm_client_config" "current" {}

# ──────────────────────────────── ⑥  Azure Key Vault  ───────────────────
resource "azurerm_key_vault" "kv" {
  name                            = "kv-${var.project}" # shortened name to meet Key Vault naming requirements (3-24 characters, alphanumeric and hyphens, must start with a letter)
  location                        = azurerm_resource_group.rg.location
  resource_group_name             = azurerm_resource_group.rg.name
  tenant_id                       = var.tenant_id
  sku_name                        = "standard"
  purge_protection_enabled        = true
  soft_delete_retention_days      = 7
  enabled_for_template_deployment = true
  rbac_authorization_enabled      = true
}

# Grant the Web App's managed identity read access to secrets at runtime
resource "azurerm_role_assignment" "kv_secrets_user_api" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_linux_web_app.api.identity[0].principal_id
}

# Grant the Terraform service principal write access to manage secrets during deployment
resource "azurerm_role_assignment" "kv_secrets_officer_terraform" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}

# Store Entra app registration client IDs and secrets in Key Vault
resource "azurerm_key_vault_secret" "blog_api_client_id" {
  name         = "AzureAdB2C--ClientId"
  value        = azuread_application.blog_api.client_id
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "blog_api_client_secret" {
  name         = "AzureAdB2C--ClientSecret"
  value        = azuread_application_password.blog_api_secret.value
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "blog_spa_client_id" {
  name         = "AzureAdB2C--SpaClientId"
  value        = azuread_application.blog_spa_app.client_id
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "blog_spa_client_secret" {
  name         = "AzureAdB2C--SpaClientSecret"
  value        = azuread_application_password.blog_spa_secret.value
  key_vault_id = azurerm_key_vault.kv.id
}