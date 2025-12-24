#pragma warning disable S3903
internal static class DevelopmentConfiguration
#pragma warning restore S3903
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
