using Scalar.AspNetCore;

namespace BlogAPI.Configurations;

internal static class ScalarConfiguration
{
    public static void UseScalar(this WebApplication app)
    {
        app.MapOpenApi();
        app.MapScalarApiReference(options =>
        {
            options.Authentication = new ScalarAuthenticationOptions
            {
                PreferredSecuritySchemes = ["OAuth2"],
            };
        });
    }
}
