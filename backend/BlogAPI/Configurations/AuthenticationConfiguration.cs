using Application.Commands.Users;
using Application.Common.Dtos;
using Application.Common.Extensions;
using Application.Enums;
using Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Serilog;

namespace BlogAPI.Configurations;

internal static class AuthenticationConfiguration
{
    public static IServiceCollection ConfigureAuthentication(
        this IServiceCollection services,
        ConfigurationManager configuration
    )
    {
        var tenantId =
            configuration["AppConfigurations:AzureAdB2C:TenantId"]
            ?? throw new InvalidOperationException("AzureAdB2C:TenantId is not configured.");
        var authority = $"https://{tenantId}.ciamlogin.com/{tenantId}/v2.0";

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(
                options =>
                {
                    configuration.Bind("AppConfigurations:AzureAdB2C", options);
                    options.Authority = authority;
                    options.TokenValidationParameters.NameClaimType = "name";
                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = HandleOnTokenValidatedAsync,
                    };
                },
                options =>
                {
                    configuration.Bind("AppConfigurations:AzureAdB2C", options);
                    options.Authority = authority;
                }
            );

        return services;
    }

    private static async Task HandleOnTokenValidatedAsync(TokenValidatedContext context)
    {
        try
        {
            var mediator =
                context.HttpContext.RequestServices.GetRequiredService<IMediator>()
                ?? throw new InvalidOperationException("Could not get service to retrieve user.");

            var userEmail = context?.Principal?.Claims
                .FirstOrDefault(c =>
                    c.Type == "emails" ||
                    c.Type == "email" ||
                    c.Type == "preferred_username" ||
                    c.Type == "upn")
                ?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                throw new InvalidOperationException("Could not get user email from token.");
            }

            var (key, user) = await GetAuthenticateUserWithKeyAsync(mediator, userEmail);

            context?.HttpContext.Items.Add(key, user);
        }
        catch (HttpContextUserLoadingProcessFailureException ex)
        {
            Log.Error(ex, "Error occurred during user loading.");
            context.Fail(ex);
        }
        catch (InvalidOperationException ex)
        {
            Log.Error(ex, "An error occurred during the authentication process.");
            context.Fail(ex);
        }
    }

    private static async Task<(string key, UserDto user)> GetAuthenticateUserWithKeyAsync(
        IMediator mediator,
        string userEmail
    )
    {
        // The email is validated as part of the command validation
        var result = await mediator.Send(new GetOrCreateUserCommand(userEmail));

        if (result.IsFailure)
        {
            throw new HttpContextUserLoadingProcessFailureException(
                result.Errors.ToAggregateString()
            );
        }

        return (Constant.HTTP_CONTEXT_USER_ITEM_KEY, result.Value);
    }
}
