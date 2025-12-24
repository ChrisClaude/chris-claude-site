using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace BlogAPI.HealthChecks;

#pragma warning disable CA1812 // Class is instantiated via dependency injection
internal sealed class CustomHealthCheck : IHealthCheck
#pragma warning restore CA1812
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default
    )
    {
        var isHealthy = true;
        var data = new Dictionary<string, object>();

        var healthyMessage = $"All custom checks ({string.Join(", ", data.Keys)}) passed";
        return Task.FromResult(
            isHealthy
                ? HealthCheckResult.Healthy(healthyMessage, data)
                : HealthCheckResult.Unhealthy("One or more custom checks failed", null, data)
        );
    }
}
