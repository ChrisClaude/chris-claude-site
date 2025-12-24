using Application;
using Application.Common.Configurations;
using BlogAPI.Configurations;
using BlogAPI.Middleware;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Serilog;

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

        services.Configure<AppConfigurations>(configuration.GetSection("AppConfigurations"));

        services.AddOptions();
        services.AddMemoryCache();

        services
            .AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft
                    .Json
                    .ReferenceLoopHandling
                    .Ignore;
            });

        services.AddEndpointsApiExplorer();

        services
            .AddApplication()
            .AddInfrastructure(appConfigurations)
            .ConfigureCors(
                appConfigurations,
                CORS_POLICY_NAME
            )
        /* .ConfigureAuthentication(configuration)
        .ConfigureSerilog(appConfigurations)
        .ConfigureAuthorization()
        .ConfigureOpenTelemetryTracing(appConfigurations)
        .ConfigureOpenApi(appConfigurations)
        .ConfigureAspNetCoreRateLimit(configuration) */;

        builder.Host.UseSerilog();

        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();
        services.ConfigureHealthChecks(appConfigurations);

        return builder.Build();
    }
    #endregion


    #region ConfigureRequestPipeline
    public static WebApplication ConfigureRequestPipeline(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseScalar();
        }

        app.MapHealthChecks("/healthz", HealthChecksConfiguration.HealthCheckOptions);
        app.UseCors(CORS_POLICY_NAME);
        app.UseSerilogRequestLogging();

#pragma warning disable S1135 // Track uses of "TODO" tags
        // TODO: Add a rate limiting middleware here https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit?view=aspnetcore-10.0
#pragma warning restore S1135

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseExceptionHandler();

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        return app;
    }
    #endregion
}
