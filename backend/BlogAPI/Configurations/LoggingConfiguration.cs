using System.Globalization;
using Serilog;
using Serilog.Events;

namespace BlogAPI.Configurations;

internal static class LoggingConfiguration
{
    public static IServiceCollection ConfigureSerilog(this IServiceCollection services)
    {
        var environment =
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
        var applicationName = "BlogAPI-" + environment;

        var loggerConfig = new LoggerConfiguration()
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("System", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .Enrich.WithMachineName()
            .Enrich.WithEnvironmentName()
            .Enrich.WithProperty("Application", applicationName)
            .WriteTo.Console(
                formatProvider: CultureInfo.InvariantCulture,
                outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}"
            );

#pragma warning disable S1135 // Track uses of "TODO" tags
        // TODO: Add application insights sink
        // TODO: In development use ELK stack

#pragma warning restore S1135 // Track uses of "TODO" tags
        Log.Logger = loggerConfig.CreateLogger();

        services.AddSerilog();
        return services;
    }
}
