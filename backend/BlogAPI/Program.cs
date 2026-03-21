using BlogAPI.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.AddDevelopmentConfiguration();
builder.AddKeyVaultConfiguration();
builder.AddServiceDefaults();

var app = builder.ConfigureServices();

app.ConfigureRequestPipeline();

app.RunAsync().ConfigureAwait(false).GetAwaiter().GetResult();
