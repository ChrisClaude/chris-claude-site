using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace BlogAPI.Configurations;

internal static class KeyVaultConfiguration
{
    public static WebApplicationBuilder AddKeyVaultConfiguration(this WebApplicationBuilder builder)
    {
        var keyVaultUri = builder.Configuration["KeyVault:Uri"];

        if (!string.IsNullOrEmpty(keyVaultUri))
        {
            builder.Configuration.AddAzureKeyVault(
                new Uri(keyVaultUri),
                new DefaultAzureCredential(),
                new AppConfigurationsKeyVaultSecretManager()
            );
        }

        return builder;
    }
}

// Maps Key Vault secret names into configuration keys:
//   "AzureAdB2C--ClientSecret" → "AppConfigurations:AzureAdB2C:ClientSecret"
//   "ConnectionStrings--blobs"  → "ConnectionStrings:blobs"  (no AppConfigurations prefix,
//                                  so AddAzureBlobClient("blobs") and EF connection strings resolve correctly)
internal sealed class AppConfigurationsKeyVaultSecretManager : KeyVaultSecretManager
{
    private const string ConnectionStringsPrefix = "ConnectionStrings--";

    public override string GetKey(KeyVaultSecret secret)
    {
        var normalised = secret.Name.Replace(
            "--",
            ConfigurationPath.KeyDelimiter,
            StringComparison.OrdinalIgnoreCase
        );

        // Connection string secrets are placed at the root ConnectionStrings section,
        // not nested under AppConfigurations.
        if (secret.Name.StartsWith(ConnectionStringsPrefix, StringComparison.OrdinalIgnoreCase))
        {
            return normalised;
        }

        return "AppConfigurations:" + normalised;
    }
}
