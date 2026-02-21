variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "qa", "prod"], var.environment)
    error_message = "Environment must be one of: dev, qa, prod."
  }
}

variable "location" {
  type = string
  validation {
    condition     = contains(["eastus", "westus", "westeurope"], var.location)
    error_message = "Location must be one of: eastus, westus, westeurope."
  }
}

variable "project" {
  type = string
}

variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
  sensitive   = true
}

variable "tenant_id" {
  description = "Azure subscription tenant ID (not the Entra External ID tenant)"
  type        = string
  sensitive   = true
}

variable "default_client_id" {
  description = "Service principal client ID for Azure subscription"
  type        = string
  sensitive   = true
}

variable "default_client_secret" {
  description = "Service principal client secret for Azure subscription"
  type        = string
  sensitive   = true
}

locals {
  suffix = "${lower(var.environment)}-${lower(var.location)}"
}
variable "sql_admin_user" {
  description = "SQL admin user"
  type        = string
  sensitive   = true
}

variable "sql_admin_password" {
  description = "SQL password"
  type        = string
  sensitive   = true
}

variable "entra_tenant_id" {
  description = "The Entra External ID tenant ID (manually created)"
  type        = string
  sensitive   = true
}

variable "entra_tenant_domain" {
  description = "The Entra External ID tenant domain (e.g., yourname.onmicrosoft.com)"
  type        = string
}

variable "entra_client_id" {
  description = "Service principal client ID for Entra External ID tenant"
  type        = string
  sensitive   = true
}

variable "entra_client_secret" {
  description = "Service principal client secret for Entra External ID tenant"
  type        = string
  sensitive   = true
}

variable "app_domain" {
  description = "Your api application domain"
  type        = string
  default     = "yourapp.azurewebsites.net"
}

variable "spa_domain" {
  description = "Your UI application domain for auth callback URLs"
  type        = string
}

variable "country_code" {
  description = "Country code for the Entra External ID tenant"
  type        = string
  default     = "US"
  validation {
    condition     = length(var.country_code) == 2
    error_message = "Country code must be a 2-letter ISO code (e.g., US, GB, DE)."
  }
}
