using System.Globalization;
using Application;
using Application.Common.Configurations;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using BlogAPI.Configurations;
using BlogAPI.GraphQL;
using BlogAPI.GraphQL.Mutations;
using BlogAPI.GraphQL.Queries;
using BlogAPI.Middleware;
using BlogAPI.Storage;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.AspNetCore.HttpOverrides;
using Serilog;
using Serilog.Events;

#pragma warning disable S3903
internal static class WebApplicationConfiguration
#pragma warning restore S3903
{
    private const string CORS_POLICY_NAME = "AllowCorsPolicy";

    #region ConfigureServices
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;
        var appConfigurations =
            configuration.GetSection("AppConfigurations").Get<AppConfigurations>()
            ?? throw new InvalidOperationException(
                "AppConfigurations section is missing in configuration."
            );

        var connectionString =
            configuration.GetConnectionString("blog-db")
            ?? appConfigurations.DBConfig?.SqlServerConnectionString
            ?? throw new InvalidOperationException(
                "No SQL Server connection string found. Provide 'ConnectionStrings:blog-db' (Aspire) or 'AppConfigurations:DBConfig:SqlServerConnectionString'."
            );

        services.Configure<AppConfigurations>(configuration.GetSection("AppConfigurations"));
        services.AddOptions();

        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders =
                ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            options.KnownIPNetworks.Clear();
            options.KnownProxies.Clear();
        });

        services.AddHttpContextAccessor();

        services
            .AddApplication()
            .AddInfrastructure(connectionString)
            .ConfigureCors(appConfigurations, CORS_POLICY_NAME)
            .ConfigureAuthentication(configuration)
            .ConfigureAuthorization()
            .ConfigureHealthChecks(appConfigurations)
            .ConfigureRateLimiter()
            .AddExceptionHandler<GlobalExceptionHandler>()
            .AddProblemDetails()
            .AddMemoryCache();

        builder.AddAzureBlobServiceClient("blobs");
        services.AddScoped<IBlobStorageService, BlobStorageService>();

        services.AddHttpResponseFormatter<GraphQLHttpResponseFormatter>();

        services
            .AddGraphQLServer()
            .RegisterDbContextFactory<ApplicationDbContext>()
            .AddQueryType()
            .AddTypeExtension(typeof(UserQuery))
            .AddMutationType()
            .AddTypeExtension(typeof(UserMutation))
            .AddMutationConventions()
            .AddAuthorization();

        builder.Host.UseSerilog(
            (context, _, configuration) =>
            {
                var environmentName = context.HostingEnvironment.EnvironmentName;
                configuration
                    .MinimumLevel.Information()
                    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                    .MinimumLevel.Override("System", LogEventLevel.Warning)
                    .Enrich.FromLogContext()
                    .Enrich.WithMachineName()
                    .Enrich.WithEnvironmentName()
                    .Enrich.WithProperty("Application", "BlogAPI-" + environmentName)
                    .WriteTo.Console(
                        formatProvider: CultureInfo.InvariantCulture,
                        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}"
                    );
            },
            writeToProviders: true
        );

        return builder.Build();
    }
    #endregion


    #region ConfigureRequestPipeline
    public static WebApplication ConfigureRequestPipeline(this WebApplication app)
    {
        // Must run first so RemoteIpAddress reflects the real client IP (from X-Forwarded-For)
        // rather than the Azure load balancer IP (or any other proxy). Without this, all requests share the same
        // rate limiter partition and the limit would apply collectively across all clients.
        app.UseForwardedHeaders();

        if (app.Environment.IsDevelopment())
        {
            app.Lifetime.ApplicationStarted.Register(() =>
            {
                try
                {
                    var blobServiceClient = app.Services.GetRequiredService<BlobServiceClient>();
                    var properties = blobServiceClient.GetProperties().Value;
                    properties.Cors.Clear();
                    properties.Cors.Add(
                        new BlobCorsRule
                        {
                            AllowedOrigins = "*",
                            AllowedMethods = "PUT,GET,OPTIONS,DELETE,HEAD",
                            AllowedHeaders = "*",
                            ExposedHeaders = "*",
                            MaxAgeInSeconds = 3600,
                        }
                    );
                    blobServiceClient.SetProperties(properties);
                }
                catch (Azure.RequestFailedException ex)
                {
                    Log.Warning(ex, "Failed to configure Azurite CORS rules");
                }
            });
        }

        app.MapHealthChecks("/healthz", HealthChecksConfiguration.HealthCheckOptions);
        app.UseCors(CORS_POLICY_NAME);
        app.UseSerilogRequestLogging();

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseRateLimiter();
        app.UseExceptionHandler();

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapGraphQL();

        return app;
    }
    #endregion
}
