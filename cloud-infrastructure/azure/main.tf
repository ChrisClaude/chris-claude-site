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

# ───────────────────────────────── ②  Azure Web App (Free tier)  ───────────────────────────


# ──────────────────────────────── ③  Azure SQL Database (Free tier) ────────────────


# ──────────────────────────────── ④  Cosmos DB (Free tier)  ───────────────────


# ──────────────────────────────── ⑤  Application Insights  ───────────────────