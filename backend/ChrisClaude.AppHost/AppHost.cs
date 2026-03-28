using System.Diagnostics;

var builder = DistributedApplication.CreateBuilder(args);

var sqlServer = builder.AddSqlServer("sql-server").WithDataVolume();

var db = sqlServer.AddDatabase("blog-db");

var api = builder
    .AddProject<Projects.BlogAPI>("blog-api")
    .WithReference(db)
    .WaitFor(db)
    .WithHttpHealthCheck("/healthz");

builder
    .AddNpmApp("frontend", "../../frontend", "dev")
    .WithReference(api)
    .WaitFor(api)
    .WithHttpEndpoint(env: "PORT");

var apiEndpoint = api.GetEndpoint("http");
var frontendDir = Path.GetFullPath(Path.Combine(builder.AppHostDirectory, "..", "..", "frontend"));

builder.Eventing.Subscribe<ResourceReadyEvent>(api.Resource, async (evt, ct) =>
{
    // Fetch the spec using .NET's HttpClient, which trusts the ASP.NET Core dev certificate.
    // This avoids the PKIX/SSL error from the Java-based openapi-generator-cli.
    var openApiUrl = $"{apiEndpoint.Url}/openapi/v1.json";
#pragma warning disable CA5400, S4830 // Dev-only AppHost: intentionally accepting the ASP.NET Core dev certificate
    using var httpClient = new HttpClient(new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
    });
#pragma warning restore CA5400, S4830
    var specJson = await httpClient.GetStringAsync(new Uri(openApiUrl), ct);

    var tempSpecFile = Path.Combine(Path.GetTempPath(), "openapi-spec.json");
    await File.WriteAllTextAsync(tempSpecFile, specJson, ct);

    try
    {
        var psi = new ProcessStartInfo
        {
            FileName = "npm",
            Arguments = "run generate-api-client",
            WorkingDirectory = frontendDir,
            UseShellExecute = false
        };
        psi.Environment["OPENAPI_URL"] = tempSpecFile;

        using var process = Process.Start(psi);
        if (process != null)
            await process.WaitForExitAsync(ct);
    }
    finally
    {
        File.Delete(tempSpecFile);
    }
});

await builder.Build().RunAsync();
