using System.Globalization;
using Application;
using Application.Common.Configurations;
using BlogAPI.Configurations;
using BlogAPI.Middleware;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
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

        services.Configure<AppConfigurations>(configuration.GetSection("AppConfigurations"));
        services.AddOptions();

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

        services
            .AddApplication()
            .AddInfrastructure(appConfigurations)
            .ConfigureCors(appConfigurations, CORS_POLICY_NAME)
            .ConfigureAuthentication(configuration)
            .ConfigureAuthorization()
            .ConfigureHealthChecks(appConfigurations)
            .ConfigureRateLimiter()
            .AddEndpointsApiExplorer()
            .AddExceptionHandler<GlobalExceptionHandler>()
            .AddProblemDetails()
            .AddMemoryCache();

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
        if (app.Environment.IsDevelopment())
        {
            app.UseScalar();
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
        app.MapControllers();

        return app;
    }
    #endregion
}
