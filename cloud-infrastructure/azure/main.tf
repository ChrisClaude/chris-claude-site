terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.96.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project}-${local.suffix}-001"
  location = lower(var.location)
}

# ───────────────────────────────── ①  Azure B2C (AAD) ─────────────────────────
resource "azurerm_b2c_directory" "blog_b2c" {
  name                = "b2c-${var.project}-${local.suffix}-001"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

# ───────────────────────────────── ②  Function App  ───────────────────────────
resource "azurerm_storage_account" "sa" {
  name                     = "sa-${var.project}-${local.suffix}-001"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "plan" {
  name                = "plan-${var.project}-${local.suffix}-001"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "Y1" # Consumption
}

resource "azurerm_linux_function_app" "blog_api" {
  name                        = "func-${var.project}-${local.suffix}-001"
  resource_group_name         = azurerm_resource_group.rg.name
  location                    = azurerm_resource_group.rg.location
  storage_account_name        = azurerm_storage_account.sa.name
  service_plan_id             = azurerm_service_plan.plan.id
  functions_extension_version = "~4"
  site_config {
    application_stack {
      dotnet_version = "8.0"
    }
  }
  identity { type = "SystemAssigned" }
}

# ──────────────────────────────── ③  SQL Database (Serverless) ────────────────
resource "azurerm_mssql_server" "sql" {
  name                         = "${var.project}-sql"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_user
  administrator_login_password = var.sql_admin_password
}

resource "azurerm_mssql_database" "blogdb" {
  name                        = "blogdb"
  server_id                   = azurerm_mssql_server.sql.id
  sku_name                    = "GP_S_Gen5_1" # General Purpose, Serverless, 1 vCore
  auto_pause_delay_in_minutes = 60            # pause when idle
  min_capacity                = 0.5
}

# ──────────────────────────────── ④  Cosmos DB (Serverless) ───────────────────
resource "azurerm_cosmosdb_account" "views" {
  name                = "${var.project}-cosmos"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  consistency_policy { consistency_level = "Session" }

  capabilities { name = "EnableServerless" } # pay-per-request
  geo_location {
    location          = azurerm_resource_group.rg.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_sql_database" "views_db" {
  name                = "postviews"
  resource_group_name = azurerm_resource_group.rg.name
  account_name        = azurerm_cosmosdb_account.views.name
}

resource "azurerm_cosmosdb_sql_container" "views_container" {
  name                = "views"
  resource_group_name = azurerm_resource_group.rg.name
  account_name        = azurerm_cosmosdb_account.views.name
  database_name       = azurerm_cosmosdb_sql_database.views_db.name

  partition_key_paths = "/postId"
  indexing_policy { indexing_mode = "consistent" }
}
