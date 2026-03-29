using ChrisClaude.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

var sqlServer = builder.AddSqlServer("sql-server").WithDataVolume();

var db = sqlServer.AddDatabase("blog-db");

var api = builder
    .AddProject<Projects.BlogAPI>("blog-api")
    .WithReference(db)
    .WaitFor(db)
    .WithHttpHealthCheck("/healthz");

var apiEndpoint = api.GetEndpoint("http");

builder
    .AddNpmApp("frontend", "../../frontend", "dev")
    .WithReference(api)
    .WaitFor(api)
    .WithHttpEndpoint(env: "PORT")
    .WithEnvironment("NEXT_PUBLIC_API_BASE_PATH", apiEndpoint);

var frontendDir = Path.GetFullPath(Path.Combine(builder.AppHostDirectory, "..", "..", "frontend"));

ApiClientGenerator.SubscribeToApiReady(builder, api, apiEndpoint, frontendDir);

await builder.Build().RunAsync();
