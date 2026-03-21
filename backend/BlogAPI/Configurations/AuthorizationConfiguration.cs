using System;
using Application.Enums;
using BlogAPI.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Configurations;

internal static class AuthorizationConfiguration
{
    public static IServiceCollection ConfigureAuthorization(this IServiceCollection services)
    {
        services
            .AddAuthorizationBuilder()
            .AddPolicy(AuthPolicy.ADMIN, policy => policy.Requirements.Add(new AdminRequirement()));

        services
            .AddAuthorizationBuilder()
            .AddPolicy(
                AuthPolicy.PUBLISHER,
                policy => policy.Requirements.Add(new PublisherRequirement())
            );

        services
            .AddAuthorizationBuilder()
            .AddPolicy(
                AuthPolicy.READER,
                policy => policy.Requirements.Add(new ReaderRequirement())
            );

        services.AddSingleton<IAuthorizationHandler, AdminAuthorizationHandler>();
        services.AddSingleton<IAuthorizationHandler, PublisherAuthorizationHandler>();
        services.AddSingleton<IAuthorizationHandler, ReaderAuthorizationHandler>();

        return services;
    }
}
