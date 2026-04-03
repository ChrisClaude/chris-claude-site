using ChrisClaude.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

var sqlserver = builder.AddSqlServer("sqlserver").WithDataVolume();

var db = sqlserver.AddDatabase("blog-db");

var storage = builder.AddAzureStorage("storage").RunAsEmulator(e => e.WithDataVolume());
var blobs = storage.AddBlobs("blobs");

var migrations = builder
    .AddProject<Projects.MigrationService>("migrations")
    .WithReference(db)
    .WaitFor(db);

var api = builder
    .AddProject<Projects.BlogAPI>("blog-api")
    .WithReference(db)
    .WithReference(blobs)
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
