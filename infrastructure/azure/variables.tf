variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "qa", "prod"], var.environment)
    error_message = "Environment must be one of: dev, qa, prod."
  }
}

variable "location" {
  type    = string
  validation {
    condition     = contains(["eastus", "westus", "westeurope"], var.location)
    error_message = "Location must be one of: eastus, westus, westeurope."
  }
}


variable "project" {
  type     = string
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