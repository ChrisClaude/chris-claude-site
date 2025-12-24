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
            && !string.IsNullOrEmpty(appConfigurations.AzureAdB2C.Instance)
            && !string.IsNullOrEmpty(appConfigurations.AzureAdB2C.Domain)
            && !string.IsNullOrEmpty(appConfigurations.AzureAdB2C.SignUpSignInPolicyId)
        )
        {
            try
            {
                var uriString =
                    $"{appConfigurations.AzureAdB2C.Instance}/{appConfigurations.AzureAdB2C.Domain}/{appConfigurations.AzureAdB2C.SignUpSignInPolicyId}/v2.0/.well-known/openid-configuration";
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
}
