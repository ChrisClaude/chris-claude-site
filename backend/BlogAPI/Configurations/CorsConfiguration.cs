using Application.Common.Configurations;
using Serilog;

namespace BlogAPI.Configurations;

internal static class CorsConfiguration
{
    public static IServiceCollection ConfigureCors(
        this IServiceCollection services,
        AppConfigurations appConfigurations,
        string policyName
    )
    {
        if (appConfigurations.AllowedCorsOrigins == null)
        {
            throw new ArgumentNullException(
                nameof(appConfigurations),
                "Allowed CORS origins are not configured"
            );
        }

        for (var i = 0; i < appConfigurations.AllowedCorsOrigins.Count; i++)
        {
            Log.Information(
                "Allowed CORS origin {0}: {1}",
                i,
                appConfigurations.AllowedCorsOrigins[i]
            );
        }

        services.AddCors(options =>
        {
            options.AddPolicy(
                policyName,
                builder =>
                {
                    if (appConfigurations.AllowedCorsOrigins != null)
                        builder.WithOrigins(appConfigurations.AllowedCorsOrigins.ToArray());

                    builder.AllowAnyHeader().AllowAnyMethod();
                }
            );
        });

        return services;
    }
}
