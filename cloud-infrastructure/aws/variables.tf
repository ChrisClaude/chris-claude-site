variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "qa", "prod"], var.environment)
    error_message = "Environment must be one of: dev, qa, prod."
  }
}

variable "aws_region" {
  type    = string
  default = "us-west-2"
  validation {
    condition     = contains(["us-west-2", "us-east-1", "eu-west-1"], var.aws_region)
    error_message = "AWS region must be one of: us-west-2, us-east-1, eu-west-1."
  }
}

variable "project" {
  type = string
}

locals {
  suffix = "${lower(var.environment)}-${lower(var.aws_region)}"
}

variable "db_admin_user" {
  description = "Database admin user"
  type        = string
  sensitive   = true
}

variable "db_admin_pass" {
  description = "Database password"
  type        = string
  sensitive   = true
}
