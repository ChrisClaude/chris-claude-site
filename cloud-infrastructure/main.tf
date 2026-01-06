terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.96.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.47.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  subscription_id = var.subscription_id
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


# ──────────────────────────────── ③  Azure SQL Database (Free tier) ────────────────


# ──────────────────────────────── ④  Cosmos DB (Free tier)  ───────────────────


# ──────────────────────────────── ⑤  Application Insights  ───────────────────