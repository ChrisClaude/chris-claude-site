var builder = WebApplication.CreateBuilder(args);

builder.AddDevelopmentConfiguration();

var app = builder.ConfigureServices();

app.ConfigureRequestPipeline();

app.RunAsync().ConfigureAwait(false).GetAwaiter().GetResult();
