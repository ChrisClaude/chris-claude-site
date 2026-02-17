var builder = DistributedApplication.CreateBuilder(args);

var sqlServer = builder.AddSqlServer("sql-server").WithDataVolume();

var db = sqlServer.AddDatabase("blog-db");

var api = builder
    .AddProject<Projects.BlogAPI>("blog-api")
    .WithReference(db)
    .WaitFor(db)
    .WithHttpHealthCheck("/health");

builder
    .AddNpmApp("frontend", "../../frontend", "dev")
    .WithReference(api)
    .WaitFor(api)
    .WithHttpEndpoint(env: "PORT");

await builder.Build().RunAsync();
