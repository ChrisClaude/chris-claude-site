using System;
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
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(
                options =>
                {
                    configuration.Bind("AppSettings:AzureAdB2C", options);
                    options.TokenValidationParameters.NameClaimType = "name";
                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = HandleOnTokenValidatedAsync,
                    };
                },
                options =>
                {
                    configuration.Bind("AppSettings:AzureAdB2C", options);
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

            var userEmail = context
                ?.Principal?.Claims.FirstOrDefault(claim => claim.Type == "emails")
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

            context.Response.StatusCode = StatusCodes.Status401Unauthorized;

            if (!context.Response.HasStarted)
            {
                context.Response.ContentType = "application/json";
                await context.Response.StartAsync();
            }

            await context.Response.WriteAsync("Failed to load user: " + ex.Message);

            await context.Response.CompleteAsync();

            context.Fail(ex);
        }
        catch (InvalidOperationException ex)
        {
            Log.Error(ex, "An error occurred during the authentication process.");

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            if (!context.Response.HasStarted)
            {
                context.Response.ContentType = "application/json";
                await context.Response.StartAsync();
            }

            await context.Response.WriteAsync(
                "An error occurred during the authentication process: " + ex.Message
            );

            await context.Response.CompleteAsync();

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
