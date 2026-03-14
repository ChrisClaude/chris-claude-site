namespace BlogAPI.Configurations;

internal static class DevelopmentConfiguration
{
    public static WebApplicationBuilder AddDevelopmentConfiguration(
        this WebApplicationBuilder builder
    )
    {
        if (builder.Environment.IsDevelopment())
        {
            builder.Configuration.AddJsonFile(
                "appsettings.secrets.json",
                optional: true,
                reloadOnChange: true
            );
        }
        return builder;
    }
}
