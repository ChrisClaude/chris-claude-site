using System.Text.Json;
using Application.Common.Configurations;
using BlogAPI.HealthChecks;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Serilog;

namespace BlogAPI.Configurations;

internal static class HealthChecksConfiguration
{
    public static readonly HealthCheckOptions HealthCheckOptions = new()
    {
        ResponseWriter = async (context, report) =>
        {
            context.Response.ContentType = "application/json";

            var response = new
            {
                Status = report.Status.ToString(),
                Duration = report.TotalDuration,
                Checks = report.Entries.Select(entry => new
                {
                    Name = entry.Key,
                    Status = entry.Value.Status.ToString(),
                    Duration = entry.Value.Duration,
                    Description = entry.Value.Description,
                    Exception = entry.Value.Exception?.Message,
                }),
                Timestamp = DateTime.UtcNow,
            };

            await JsonSerializer.SerializeAsync(context.Response.Body, response);
        },
    };

    public static IServiceCollection ConfigureHealthChecks(
        this IServiceCollection services,
        AppConfigurations appConfigurations
    )
    {
        var healthChecks = services.AddHealthChecks().AddCheck<CustomHealthCheck>("custom-check");

        if (
            appConfigurations != null
            && appConfigurations.AzureAdB2C != null
            && IsValid(
                appConfigurations.AzureAdB2C.Instance,
                nameof(appConfigurations.AzureAdB2C.Instance)
            )
            && IsValid(
                appConfigurations.AzureAdB2C.Domain,
                nameof(appConfigurations.AzureAdB2C.Domain)
            )
            && IsValid(
                appConfigurations.AzureAdB2C.SignUpSignInPolicyId,
                nameof(appConfigurations.AzureAdB2C.SignUpSignInPolicyId)
            )
            && IsValid(
                appConfigurations.AzureAdB2C.ClientId,
                nameof(appConfigurations.AzureAdB2C.ClientId)
            )
            && IsValid(
                appConfigurations.AzureAdB2C.ClientSecret,
                nameof(appConfigurations.AzureAdB2C.ClientSecret)
            )
        )
        {
            try
            {
                var uriString =
                    $"{appConfigurations.AzureAdB2C.Instance}/{appConfigurations.AzureAdB2C.TenantId}/v2.0/.well-known/openid-configuration?appid={appConfigurations.AzureAdB2C.ClientId}";
                var uri = new Uri(uriString);
                var tags = new[] { "auth" };

                healthChecks.AddUrlGroup(uri, name: "azure-b2c", tags: tags);
            }
            catch (UriFormatException ex)
            {
                Log.Error(
                    ex,
                    "Invalid Azure AD B2C configuration for health checks: {Instance}, {Domain}, {PolicyId}",
                    appConfigurations.AzureAdB2C.Instance,
                    appConfigurations.AzureAdB2C.Domain,
                    appConfigurations.AzureAdB2C.SignUpSignInPolicyId
                );
            }
        }

        return services;
    }

    private static bool IsValid(string value, string name)
    {
        if (string.IsNullOrEmpty(value))
        {
            throw new InvalidOperationException(
                $"Azure AD B2C configuration value '{name}' is missing or empty."
            );
        }

        return true;
    }
}
