using System.Diagnostics;

namespace ChrisClaude.AppHost;

internal static class GraphQLCodeGenerator
{
    internal static void SubscribeToApiReady(
        IDistributedApplicationBuilder builder,
        IResourceBuilder<ProjectResource> api,
        EndpointReference apiEndpoint,
        string frontendDir
    )
    {
        builder.Eventing.Subscribe<ResourceReadyEvent>(
            api.Resource,
            async (evt, ct) =>
            {
                // Wait for the API to be fully ready and responding to health checks
                await WaitForApiHealthy(apiEndpoint, ct);

                var psi = new ProcessStartInfo
                {
                    FileName = "npm",
                    Arguments = "run codegen",
                    WorkingDirectory = frontendDir,
                    UseShellExecute = false,
                };
                psi.Environment["GRAPHQL_URL"] = $"{apiEndpoint.Url}/graphql";
                // Allow Node.js to trust the ASP.NET Core dev certificate during introspection
                psi.Environment["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

                using var process = Process.Start(psi);
                if (process != null)
                    await process.WaitForExitAsync(ct);
            }
        );
    }

    private static async Task WaitForApiHealthy(EndpointReference apiEndpoint, CancellationToken ct)
    {
#pragma warning disable CA2000 // HttpClientHandler disposed by HttpClient
#pragma warning disable S4830 // Certificate validation disabled for dev certificates only
        var handler = new HttpClientHandler();
        // Development only: Ignore certificate validation for ASP.NET Core dev certificates
        handler.ServerCertificateCustomValidationCallback = (_, _, _, _) => true;

        using var client = new HttpClient(handler);
#pragma warning restore S4830
#pragma warning restore CA2000

        var maxRetries = 30;
        var delayMs = 500;

        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                var healthUrl = new Uri($"{apiEndpoint.Url}/healthz");
                var response = await client.GetAsync(healthUrl, ct);
                if (response.IsSuccessStatusCode)
                {
                    return;
                }
            }
            catch (HttpRequestException)
            {
                // API not ready yet, will retry
            }

            if (i < maxRetries - 1)
            {
                await Task.Delay(delayMs, ct);
            }
        }

        throw new InvalidOperationException("API failed to become healthy within the timeout period");
    }
}
