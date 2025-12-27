# ═══════════════════════════════════════════════════════════════════════════════
# Microsoft Entra External ID Tenant Setup
# ═══════════════════════════════════════════════════════════════════════════════
#
# This configuration manages resources in an existing Microsoft Entra External ID
# tenant for customer identity and access management (CIAM).
#
# The tenant has been created manually in Azure and its details are provided
# via variables (entra_tenant_id and entra_tenant_domain).
#
# Learn more:
# - https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam
# ═══════════════════════════════════════════════════════════════════════════════

# ───────────────────────────────────────────────────────────────────────────────
# Configure AzureAD Provider for External Tenant
# ───────────────────────────────────────────────────────────────────────────────
#
# Provider aliasing allows using multiple instances of the same provider
# Here we create a second AzureAD provider specifically for the external tenant
#
# Why aliasing?
# - You might already have an azuread provider for your main tenant
# - This alias targets the existing external tenant
# - Resources can specify which provider instance to use
#
# Learn more: https://www.terraform.io/language/providers/configuration#alias
provider "azuread" {
  tenant_id = var.entra_tenant_id
  alias     = "external"
}

# ───────────────────────────────────────────────────────────────────────────────
# Application Registration in External Tenant
# ───────────────────────────────────────────────────────────────────────────────
#
# Create an OAuth2/OpenID Connect application for your web app
# This app registration enables authentication flows in the existing tenant
#
# Important properties:
# - display_name: Shows in consent screens and admin portal
# - sign_in_audience: AzureADMyOrg = only this tenant's users
# - redirect_uris: Where users return after authentication
# - implicit_grant: Enables ID tokens for client-side apps
#
# Learn more: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
resource "azuread_application" "blog_app" {
  provider     = azuread.external # Use the external tenant provider
  display_name = "ChrisClaudeBlog"

  # Only users in this tenant can sign in
  sign_in_audience = "AzureADMyOrg"

  # Web application configuration
  web {
    # OAuth redirect URIs - where auth responses are sent
    # Include both production and local development URLs
    redirect_uris = [
      "https://${var.app_domain}/auth/callback",
      "http://localhost:3000/auth/callback"
    ]

    # Implicit grant flow settings
    # Required for single-page applications
    implicit_grant {
      access_token_issuance_enabled = true # Enable access tokens
      id_token_issuance_enabled     = true # Enable ID tokens
    }
  }

  # Microsoft Graph API permissions
  # This declares what permissions your app needs
  required_resource_access {
    # Microsoft Graph API identifier
    resource_app_id = "00000003-0000-0000-c000-000000000000"

    # User.Read permission - allows app to read user profile
    resource_access {
      id   = "e1fe6dd8-ba31-4d61-89e7-88639da4683d" # User.Read
      type = "Scope"                                # Delegated permission (requires user)
    }
  }
}

# ───────────────────────────────────────────────────────────────────────────────
# Service Principal
# ───────────────────────────────────────────────────────────────────────────────
#
# A service principal is the local representation of the app in this tenant
# Think of it as the "instance" of your app registration
#
# Why needed?
# - App registration = global definition
# - Service principal = local instance for this tenant
# - Needed for role assignments and access control
#
# Learn more: https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals
resource "azuread_service_principal" "blog_app" {
  provider  = azuread.external
  client_id = azuread_application.blog_app.client_id
}

# ═══════════════════════════════════════════════════════════════════════════════
# Outputs - Export Important Values
# ═══════════════════════════════════════════════════════════════════════════════
#
# Outputs make values available to:
# - Other Terraform modules
# - CI/CD pipelines
# - Manual retrieval (terraform output)
#
# Sensitive outputs are hidden from console by default
# ═══════════════════════════════════════════════════════════════════════════════

output "external_tenant_id" {
  value       = var.entra_tenant_id
  description = "The Entra External ID Tenant ID - use for authentication configuration"
  sensitive   = true # Don't display in console output
}

output "external_tenant_domain" {
  value       = var.entra_tenant_domain
  description = "The Entra External ID Tenant Domain (e.g., yourname.onmicrosoft.com)"
}

output "application_client_id" {
  value       = azuread_application.blog_app.client_id
  description = "The Application (Client) ID - use in your app configuration"
  sensitive   = true
}
