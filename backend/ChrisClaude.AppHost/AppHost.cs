using ChrisClaude.AppHost;
using ChrisClaude.Aspire;

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

var apiEndpoint = api.GetEndpoint("https");

var frontend = builder
    .AddNpmApp("frontend", "../../frontend", "dev")
    .WithReference(api)
    .WaitFor(api)
    .WithHttpEndpoint(port: 3000, env: "PORT")
    .WithEnvironment("NEXT_PUBLIC_API_BASE_PATH", apiEndpoint);

frontend.WithEnvironment("NEXTAUTH_URL", frontend.GetEndpoint("http"));

var frontendDir = Path.GetFullPath(Path.Combine(builder.AppHostDirectory, "..", "..", "frontend"));

GraphQLCodeGenerator.SubscribeToApiReady(builder, api, apiEndpoint, frontendDir);

await builder.Build().RunAsync();
