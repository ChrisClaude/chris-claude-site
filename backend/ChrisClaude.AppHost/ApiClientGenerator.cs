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
}
