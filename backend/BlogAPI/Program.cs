using BlogAPI.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.AddDevelopmentConfiguration();
builder.AddKeyVaultConfiguration();

var app = builder.ConfigureServices();

app.ConfigureRequestPipeline();

app.RunAsync().ConfigureAwait(false).GetAwaiter().GetResult();
