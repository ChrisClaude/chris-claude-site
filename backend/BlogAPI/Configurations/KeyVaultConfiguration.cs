using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Extensions.Configuration;

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

// Maps Key Vault secret names (e.g. "AzureAdB2C--ClientSecret") into the AppConfigurations
// config section (e.g. "AppConfigurations:AzureAdB2C:ClientSecret") to match the structure
// expected by the AppConfigurations record.
internal sealed class AppConfigurationsKeyVaultSecretManager : KeyVaultSecretManager
{
    public override string GetKey(KeyVaultSecret secret) =>
        "AppConfigurations:"
        + secret.Name.Replace(
            "--",
            ConfigurationPath.KeyDelimiter,
            StringComparison.OrdinalIgnoreCase
        );
}
