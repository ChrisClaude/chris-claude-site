using ChrisClaude.AppHost;
using ChrisClaude.Aspire;
using Microsoft.Extensions.Configuration;

var builder = DistributedApplication.CreateBuilder(args);

var infra = builder.AddChrisClaudeInfrastructure();

var migrations = builder
    .AddProject<Projects.MigrationService>(ChrisClaudeResourceNames.MIGRATIONS)
    .WithReference(infra.Database)
    .WaitFor(infra.Database);

var api = builder
    .AddProject<Projects.BlogAPI>(ChrisClaudeResourceNames.BLOG_API)
    .WithReference(infra.Database)
    .WithReference(infra.Blobs)
    .WaitFor(migrations)
    .WithHttpHealthCheck("/healthz");

// The Next.js dev server and GraphQL codegen need Node/npm and write into the
// frontend directory, so they are skipped when the AppHost is booted from the
// integration tests (which set IncludeFrontend=false).
var includeFrontend = builder.Configuration.GetValue("IncludeFrontend", true);

if (includeFrontend)
{
    var apiEndpoint = api.GetEndpoint("https");

    var frontend = builder
        .AddNpmApp("frontend", "../../frontend", "dev")
        .WithReference(api)
        .WaitFor(api)
        .WithHttpEndpoint(port: 3000, env: "PORT")
        .WithEnvironment("NEXT_PUBLIC_API_BASE_PATH", apiEndpoint);

    frontend.WithEnvironment("NEXTAUTH_URL", frontend.GetEndpoint("http"));

    var frontendDir = Path.GetFullPath(
        Path.Combine(builder.AppHostDirectory, "..", "..", "frontend"));

    GraphQLCodeGenerator.SubscribeToApiReady(builder, api, apiEndpoint, frontendDir);
}

await builder.Build().RunAsync();
