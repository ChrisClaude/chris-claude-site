using System;
using Application.Common.Dtos;
using Application.Common.Extensions;
using Application.Enums;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Authorization;

internal sealed class PublisherRequirement : IAuthorizationRequirement { }

[System.Diagnostics.CodeAnalysis.SuppressMessage(
    "Performance",
    "CA1812:Avoid uninstantiated internal classes",
    Justification = "Instantiated via dependency injection"
)]
internal sealed class PublisherAuthorizationHandler : AuthorizationHandler<PublisherRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PublisherAuthorizationHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor =
            httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PublisherRequirement requirement
    )
    {
        if (
            _httpContextAccessor.HttpContext?.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY]
            is not UserDto user
        )
        {
            return Task.CompletedTask;
        }

        if (user.IsPublisher())
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
