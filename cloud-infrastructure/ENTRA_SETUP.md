# Microsoft Entra External ID with Terraform

## Table of Contents

- [Overview](#overview)
- [Application Registration](#application-registration)
- [Configuration Guide](#configuration-guide)
- [Troubleshooting](#troubleshooting)
- [Security Best Practices](#security-best-practices)
- [Integration Examples](#integration-examples)
- [References & Further Reading](#references--further-reading)

## Overview

This Terraform configuration manages application registrations and resources in an **existing** Microsoft Entra External ID tenant. The tenant must be created manually in Azure before running Terraform.

**What This Does:**

- ✅ Configures Terraform to connect to your existing tenant
- ✅ Creates and manages application registrations
- ✅ Sets up OAuth redirect URIs and permissions
- ✅ Configures service principals

**What This Doesn't Do:**

- ❌ Create the Entra External ID tenant (manual step)
- ❌ Configure user flows (manual step)
- ❌ Create client secrets (security best practice)

### Required Tools

| Tool                                                                           | Version | Installation                         | Purpose                         |
|--------------------------------------------------------------------------------|---------|--------------------------------------|---------------------------------|
| [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)    | 2.50+   | `brew install azure-cli` (macOS)     | Azure authentication & API calls |
| [Terraform](https://www.terraform.io/downloads)                                | 1.1.0+  | `brew install terraform` (macOS)     | Infrastructure orchestration    |

## Quick Start

### Automated Deployment (Recommended)

The quickest way to get started:

```bash
cd cloud-infrastructure/azure
./scripts/quick-start.sh
```

This interactive script will:

1. ✅ Verify all prerequisites
2. ✅ Create `terraform.tfvars` from template
3. ✅ Initialize Terraform
4. ✅ Deploy the infrastructure
5. ✅ Provide next steps

### Manual Deployment

```bash
# Copy the example variables file
cp terraform.tfvars.example terraform.tfvars

# Edit with your values
nano terraform.tfvars
```

**Required Variables:**

```hcl
# Tenant details from Step 1
entra_tenant_id = "12345678-1234-1234-1234-123456789abc"  # From Azure Portal
entra_tenant_domain = "yourcompany.onmicrosoft.com"      # From tenant creation

# Your application's domain for OAuth callbacks
app_domain = "myapp.azurewebsites.net"

# Azure infrastructure settings
environment = "dev"        # dev, qa, or prod
location = "eastus"         # Azure region
project = "chrisclaude"     # Project name

# Database credentials (if using)
sql_admin_user = "sqladmin"
sql_admin_password = "SuperSecret123!@#"
```

**⚠️ Security Note:** The `entra_tenant_id` is marked as sensitive and won't appear in console output.

📚 [Terraform variable documentation](https://www.terraform.io/language/values/variables)

### Step 3: Initialize Terraform

```bash
cd cloud-infrastructure/azure
terraform init
```

This downloads the required providers:

- `hashicorp/azurerm` - Azure Resource Manager
- `hashicorp/azuread` - Azure Active Directory

### Step 4: Authenticate to Azure

```bash
# Login to Azure
az login

# Set your subscription
az account set --subscription "<your-subscription-id>"

# Login to the External ID tenant for AzureAD provider
az login --tenant "<your-tenant-id>" --allow-no-subscriptions
```

### Step 5: Plan the Deployment

```bash
terraform plan -out=tfplan
```

**What happens during plan:**

1. Connects to your existing tenant
2. Shows what will be created/changed
3. Validates configuration

### Step 6: Apply the Configuration

```bash
terraform apply tfplan
```

**Deployment Steps:**

1. Creates Azure resource group
2. Configures AzureAD provider with your tenant
3. Creates application registration in your tenant
4. Sets up service principal

⏱️ **Expected Duration:** 2-5 minutes

### Step 7: Save Outputs Securely

```bash
# Export all outputs to JSON
terraform output -json > entra-outputs.json

# Or view specific outputs
terraform output external_tenant_id
terraform output application_client_id
```

⚠️ **Security Note:** These outputs contain sensitive information. Store them securely (e.g., Azure Key Vault, 1Password, etc.)

## Application Registration

### What's Automated ✅

The Terraform configuration handles:

- ✅ Application registration in the tenant
- ✅ Redirect URI configuration
- ✅ Microsoft Graph API permissions setup
- ✅ Service principal creation
- ✅ OAuth2 implicit grant settings

### What Requires Manual Steps ⚠️

#### 1. Grant Admin Consent for API Permissions

## Troubleshooting

### Common Issues and Solutions

#### ❌ "Error: Invalid Tenant ID"

**Error:**

```text
Error: building account: getting authenticated object ID: getting object ID for current user
```

**Solution:**

```bash
# Verify you're logged into the correct tenant
az account show

# Login to the External ID tenant specifically
az login --tenant "<your-tenant-id>" --allow-no-subscriptions

# Verify tenant ID is correct in terraform.tfvars
cat terraform.tfvars | grep entra_tenant_id
```

#### ❌ "Insufficient privileges to complete the operation"

**Error:**

```text
Error: Insufficient privileges to complete the operation
```

**Solution:**
You need **Global Administrator** or **Application Administrator** role in the External ID tenant:

1. Go to Azure Portal → Your External ID Tenant
2. Navigate to **Roles and administrators**
3. Assign yourself the **Application Administrator** role

📚 [Azure AD role documentation](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/)

#### ❌ "Provider configuration not found"

**Error:**

```text
Error: Provider configuration not available
```

**Solution:**

```bash
# Ensure you've initialized Terraform
terraform init

# If you updated provider configuration, re-initialize
terraform init -upgrade
```

## Security Best Practices

### 🔒 Secrets Management

**NEVER commit these files:**

- ❌ `terraform.tfvars` (contains passwords)
- ❌ `tenant-output.json` (contains tenant IDs)
- ❌ `entra-outputs.json` (contains client IDs)
- ❌ `.env` files (contains secrets)

**DO:**

- ✅ Use Azure Key Vault for production secrets
- ✅ Use environment variables for CI/CD
- ✅ Rotate secrets regularly (every 90 days)
- ✅ Use separate tenants for dev/staging/prod

### 🔐 Authentication Best Practices

```hcl
# Use managed identities when possible
provider "azurerm" {
  use_msi = true  # For Azure VMs/Functions
}

# Or service principal with certificate (not password)
provider "azurerm" {
  client_id       = var.client_id
  tenant_id       = var.tenant_id
  client_certificate_path = var.cert_path
}
```

📚 [Terraform Azure authentication](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#authenticating-to-azure)

### 🛡️ Principle of Least Privilege

```bash
# Create custom role with minimal permissions
az role definition create --role-definition '{
  "Name": "Entra Tenant Operator",
  "Description": "Can create and manage Entra tenants",
  "Actions": [
    "Microsoft.AzureActiveDirectory/ciamDirectories/write",
    "Microsoft.AzureActiveDirectory/ciamDirectories/read"
  ],
  "AssignableScopes": ["/subscriptions/<subscription-id>"]
}'
```

### 📝 Audit and Compliance

```bash
# Enable diagnostic logging
az monitor diagnostic-settings create \
  --resource <tenant-resource-id> \
  --name "AuditLogs" \
  --logs '[{"category": "AuditLogs", "enabled": true}]' \
  --workspace <log-analytics-workspace-id>
```

📚 [Azure security baseline](https://learn.microsoft.com/en-us/security/benchmark/azure/)

## File Structure

```text
cloud-infrastructure/azure/
├── main.tf                      # Main Terraform config & providers
├── entra-external.tf            # Application registration config
├── variables.tf                 # Input variables
├── terraform.tfvars.example     # Sample configuration
├── terraform.tfvars            # Your config (gitignored)
├── ENTRA_SETUP.md              # This documentation
├── .terraform/                 # Provider plugins
└── terraform.tfstate           # State file (gitignored)
```

## Integration with Your Application

### Example: Node.js/Express Application

```javascript
// config/entra.js
const { ConfidentialClientApplication } = require('@azure/msal-node');

const config = {
  auth: {
    clientId: process.env.ENTRA_CLIENT_ID,
    authority: `https://${process.env.ENTRA_TENANT_DOMAIN}.ciamlogin.com`,
    clientSecret: process.env.ENTRA_CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message) => console.log(message),
      piiLoggingEnabled: false,
      logLevel: 'Info',
    }
  }
};

const msalClient = new ConfidentialClientApplication(config);

module.exports = msalClient;
```

📚 [MSAL Node documentation](https://learn.microsoft.com/en-us/entra/msal/node/)

### Example: .NET/C# Application

```csharp
// Startup.cs or Program.cs
services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(options =>
    {
        options.Instance = $"https://{Configuration["Entra:TenantDomain"]}.ciamlogin.com/";
        options.ClientId = Configuration["Entra:ClientId"];
        options.ClientSecret = Configuration["Entra:ClientSecret"];
        options.CallbackPath = "/auth/callback";
    });
```

📚 [Microsoft Identity Web documentation](https://learn.microsoft.com/en-us/entra/msal/dotnet/microsoft-identity-web/)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy Infrastructure

on:
  push:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
      
      - name: Terraform Init
        run: terraform init
        working-directory: ./cloud-infrastructure/azure
      
      - name: Terraform Plan
        run: terraform plan
        working-directory: ./cloud-infrastructure/azure
        env:
          TF_VAR_sql_admin_password: ${{ secrets.SQL_PASSWORD }}
      
      - name: Terraform Apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply -auto-approve
        working-directory: ./cloud-infrastructure/azure
```

📚 [GitHub Actions for Azure](https://learn.microsoft.com/en-us/azure/developer/github/github-actions)

## References & Further Reading

### Microsoft Documentation

#### Entra External ID

- [Overview & Concepts](https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam) - What is External ID and when to use it
- [Quickstart: Tenant Setup](https://learn.microsoft.com/en-us/entra/external-id/customers/quickstart-tenant-setup) - Manual tenant creation guide
- [User Flows](https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-user-flow-sign-up-sign-in-customers) - Configure sign-up/sign-in
- [Branding & Customization](https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-customize-branding-customers) - White-label your auth pages
- [Security Best Practices](https://learn.microsoft.com/en-us/entra/external-id/customers/concept-security-customers) - Secure your implementation

#### Azure APIs & CLI

- [Azure REST API Reference](https://learn.microsoft.com/en-us/rest/api/activedirectory/) - Complete API documentation
- [Azure CLI Documentation](https://learn.microsoft.com/en-us/cli/azure/) - Command-line interface guide
- [Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/) - Role-based access control

#### Authentication Libraries

- [MSAL Overview](https://learn.microsoft.com/en-us/entra/msal/overview) - Microsoft Authentication Library
- [MSAL for Node.js](https://learn.microsoft.com/en-us/entra/msal/node/) - JavaScript/TypeScript integration
- [Microsoft Identity Web](https://learn.microsoft.com/en-us/entra/msal/dotnet/microsoft-identity-web/) - .NET integration

### Terraform Documentation

- [Terraform Language](https://www.terraform.io/language) - HCL syntax and concepts
- [AzureRM Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) - Azure Resource Manager
- [AzureAD Provider](https://registry.terraform.io/providers/hashicorp/azuread/latest/docs) - Azure Active Directory
- [Null Provider](https://registry.terraform.io/providers/hashicorp/null/latest/docs) - For executing scripts
- [Provider Aliasing](https://www.terraform.io/language/providers/configuration#alias-multiple-provider-configurations) - Multi-provider patterns
- [Variables](https://www.terraform.io/language/values/variables) - Input variables
- [Outputs](https://www.terraform.io/language/values/outputs) - Output values

### Community Resources

- [Azure Terraform Examples](https://github.com/hashicorp/terraform-provider-azurerm/tree/main/examples) - Official examples
- [Terraform Best Practices](https://www.terraform-best-practices.com/) - Community guide
- [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/) - Architecture patterns

### Security & Compliance

- [Azure Security Baseline](https://learn.microsoft.com/en-us/security/benchmark/azure/) - Security recommendations
- [OAuth 2.0 & OpenID Connect](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols) - Protocol specifications
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Security best practices

## Support & Contributing

### Getting Help

- 🐛 **Issues:** Check existing issues or create new ones in the repository
- 💬 **Questions:** Use GitHub Discussions for Q&A
- 📧 **Security:** Report security issues privately to the maintainers

### Contributing

Contributions welcome! Areas for improvement:

- [ ] Add support for additional identity providers
- [ ] Automated testing with Terratest
- [ ] PowerShell version of bash scripts
- [ ] Monitoring and alerting setup
- [ ] Cost optimization strategies

---

**Last Updated:** December 27, 2025  
**Terraform Version:** 1.1.0+  
**Azure CLI Version:** 2.50+

**Authors:** ChrisClaude Development Team  
**License:** MIT
    ├── .terraform/                           # Provider plugins
    ├── terraform.tfstate                     # State file
    └── *.tfplan                              # Plan files

### Enable Debug Logging

For detailed troubleshooting:

```bash
# Terraform debug logs
export TF_LOG=DEBUG
export TF_LOG_PATH=./terraform-debug.log
terraform apply

# Azure CLI debug logs
az account show --debug
```

#### 2. Create Client Secret

**Why Manual?** Secrets should never be stored in Terraform state.

**Steps:**

1. In your app registration, go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description (e.g., "Production API Key")
4. Select expiration (recommend 6 months max)
5. Click **Add**
6. **⚠️ CRITICAL:** Copy the secret value immediately (shown only once!)

**Store Securely:**

```bash
# Option 1: Azure Key Vault (recommended for production)
az keyvault secret set \
  --vault-name "your-keyvault" \
  --name "entra-client-secret" \
  --value "your-secret-value"

# Option 2: Local .env file (development only)
echo "ENTRA_CLIENT_SECRET=your-secret-value" >> .env
echo ".env" >> .gitignore
```

📚 [Client secret best practices](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal#option-2-create-a-new-application-secret)

#### 3. Configure User Flows (Sign-up/Sign-in Experience)

**Steps:**

1. In Entra Admin Center, go to **External Identities** > **User flows**
2. Click **New user flow**
3. Select template: **Sign up and sign in**
4. Configure:
   - Identity providers (Email, Google, Facebook, etc.)
   - User attributes to collect
   - Multi-factor authentication
   - Page layouts and branding

📚 [User flows documentation](https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-user-flow-sign-up-sign-in-customers)

#### 4. Customize Branding

**Steps:**

1. Go to **Company branding** in Entra Admin Center
2. Upload:
   - Company logo
   - Background image
   - Favicon
3. Set:
   - Primary color
   - Custom CSS (optional)

📚 [Branding customization guide](https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-customize-branding-customers)-17-preview`

- Creates a CIAM directory resource type
- Returns tenant ID for further configuration

📚 [Azure AD REST API documentation](https://learn.microsoft.com/en-us/rest/api/activedirectory/)

## Configuration Guide

### Terraform Outputs

After running `terraform apply`, you'll get:

- `external_tenant_id`: Your External ID tenant ID (sensitive)
- `external_tenant_domain`: The tenant domain (e.g., yourcompany.onmicrosoft.com)
- `application_client_id`: The registered app's client ID (sensitive)

### What Terraform Manages

The Terraform configuration automatically:

- ✅ Creates an application registration
- ✅ Configures redirect URIs
- ✅ Sets up Microsoft Graph API permissions
- ✅ Creates service principal

### What Requires Manual Configuration

You still need to manually:

- Grant admin consent for API permissions (Azure Portal)
- Create client secrets (security best practice - don't store in Terraform)
- Configure user flows and branding

## Integration Examples
