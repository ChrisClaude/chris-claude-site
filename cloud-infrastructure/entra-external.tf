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
# - https://learn.microsoft.com/en-us/entra/external-id/customers/quickstart-tenant-setup
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
# Authentication uses a service principal that exists in the Entra External ID tenant
#
# Learn more: https://www.terraform.io/language/providers/configuration#alias
provider "azuread" {
  tenant_id     = var.entra_tenant_id
  client_id     = var.entra_client_id
  client_secret = var.entra_client_secret
  alias         = "external"
}

# ═══════════════════════════════════════════════════════════════════════════════
# Blog API Application Registration
# ═══════════════════════════════════════════════════════════════════════════════
#
# This is an app registration for the backend API
# It exposes scopes that the frontend app can request access to
#
# Key differences from frontend app:
# - Exposes API scopes (oauth2_permission_scope)
# - Does NOT need redirect URIs (it validates tokens, not redirect users)
# - Acts as a resource server in OAuth2 flow
#
# Learn more: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-expose-web-apis
# ═══════════════════════════════════════════════════════════════════════════════

# Generate stable UUIDs for OAuth2 permission scopes
# These must remain constant across Terraform runs to avoid permission issues
resource "random_uuid" "blog_read_scope_id" {}
resource "random_uuid" "blog_write_scope_id" {}

resource "azuread_application" "blog_api" {
  provider     = azuread.external
  display_name = "ChrisClaudeBlog API"

  # Only users in this tenant can access the API
  sign_in_audience = "AzureADMyOrg"

  # Generate a unique identifier URI for the API
  # This will be used as the audience in access tokens
  identifier_uris = ["api://${var.app_domain}/blog-api"]

  # Expose API scopes that client applications can request
  # These define what permissions the frontend can request
  api {
    # Use v2.0 access tokens (required for Entra External ID / CIAM tenants)
    requested_access_token_version = 2

    # Define delegated permissions (scopes) for user-based access
    oauth2_permission_scope {
      # Unique identifier for this scope (Azure-assigned, stable across runs)
      id = random_uuid.blog_read_scope_id.result

      # This is what the frontend will request: api://your-domain/blog.read
      value = "blog.read"

      # Whether admin consent is required (false = user can consent)
      admin_consent_display_name = "Access Blog API as the read-only user"
      admin_consent_description  = "Allow the application to access the Blog API on behalf of the signed-in user with read-only permissions."

      # User-facing consent text
      user_consent_display_name = "Access your blog data with read-only permissions"
      user_consent_description  = "Allow the application to access the blog API on your behalf with read-only permissions."

      # This scope is enabled and available for use
      enabled = true
      type    = "User" # User-delegated permission
    }

    oauth2_permission_scope {
      # Unique identifier for this scope (Azure-assigned, stable across runs)
      id = random_uuid.blog_write_scope_id.result

      # This is what the frontend will request: api://your-domain/blog.write
      value = "blog.write"

      # Whether admin consent is required (false = user can consent)
      admin_consent_display_name = "Write access to Blog API"
      admin_consent_description  = "Allow the application to write data to the Blog API on behalf of the signed-in user."

      # User-facing consent text
      user_consent_display_name = "Write to your blog data"
      user_consent_description  = "Allow the application to create, update, and delete blog content on your behalf."

      # This scope is enabled and available for use
      enabled = true
      type    = "User" # User-delegated permission
    }
  }
}

# ───────────────────────────────────────────────────────────────────────────────
# Blog API Service Principal
# ───────────────────────────────────────────────────────────────────────────────
#
# Create a service principal (enterprise application) for the Blog API
# This is required before admin consent can be granted to API permissions
#
# An app registration defines the app's configuration, but the service principal
# is the actual instance of the app in the directory that users/admins interact with
#
# Learn more: https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals
resource "azuread_service_principal" "blog_api" {
  provider       = azuread.external
  client_id      = azuread_application.blog_api.client_id
  use_existing   = true

  # Make this API visible to users for consent
  app_role_assignment_required = false
}

# ───────────────────────────────────────────────────────────────────────────────
# Frontend (SPA) Application Registration in External Tenant
# ───────────────────────────────────────────────────────────────────────────────
#
# Create an OAuth2/OpenID Connect application for your web app
# This app registration enables authentication flows
#
# Important properties:
# - display_name: Shows in consent screens and admin portal
# - sign_in_audience: AzureADMyOrg = only this tenant's users
# - redirect_uris: Where users return after authentication
# - implicit_grant: Enables ID tokens for client-side apps
#
# Learn more: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
resource "azuread_application" "blog_spa_app" {
  provider     = azuread.external # Use the external tenant provider
  display_name = "ChrisClaudeBlog"

  # Only users in this tenant can sign in
  sign_in_audience = "AzureADMyOrg"

  # Use v2.0 access tokens (required for Entra External ID / CIAM tenants)
  api {
    requested_access_token_version = 2
  }

  # Web application configuration
  web {
    # OAuth redirect URIs - where auth responses are sent
    # Include both production and local development URLs
    redirect_uris = [
      "https://${var.spa_domain}/auth/callback",
      "http://localhost:3000/auth/callback"
    ]

    # Implicit grant flow settings
    # Required for single-page applications
    implicit_grant {
      access_token_issuance_enabled = true # Enable access tokens
      id_token_issuance_enabled     = true # Enable ID tokens
    }
  }

  # Permission to access the Blog API
  # This will be populated after the API app is created
  required_resource_access {
    resource_app_id = azuread_application.blog_api.client_id

    # Request blog.read scope
    resource_access {
      id   = random_uuid.blog_read_scope_id.result
      type = "Scope"
    }

    # Request blog.write scope
    resource_access {
      id   = random_uuid.blog_write_scope_id.result
      type = "Scope"
    }
  }
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

output "api_client_id" {
  value       = azuread_application.blog_api.client_id
  description = "The API Application (Client) ID - use in your .NET API configuration"
  sensitive   = true
}

output "frontend_client_id" {
  value       = azuread_application.blog_spa_app.client_id
  description = "The Frontend Application (Client) ID - use in your React app configuration"
  sensitive   = true
}

output "api_scope_read" {
  value       = "api://${var.app_domain}/blog-api/blog.read"
  description = "The API read scope that the frontend should request for read-only operations"
}

output "api_scope_write" {
  value       = "api://${var.app_domain}/blog-api/blog.write"
  description = "The API write scope that the frontend should request for write operations"
}

output "api_scopes_all" {
  value       = "api://${var.app_domain}/blog-api/blog.read api://${var.app_domain}/blog-api/blog.write"
  description = "All API scopes - use this when requesting both read and write permissions"
}

output "api_audience" {
  value       = "api://${var.app_domain}/blog-api"
  description = "The API audience (identifier URI) - use for token validation in the API"
}
