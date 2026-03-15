using System;
using Application.Common.Dtos;
using Application.Common.Extensions;
using Application.Enums;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Authorization;

internal sealed class AdminRequirement : IAuthorizationRequirement { }

[System.Diagnostics.CodeAnalysis.SuppressMessage(
    "Performance",
    "CA1812:Avoid uninstantiated internal classes",
    Justification = "Instantiated via dependency injection"
)]
internal sealed class AdminAuthorizationHandler : AuthorizationHandler<AdminRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AdminAuthorizationHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor =
            httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        AdminRequirement requirement
    )
    {
        if (
            _httpContextAccessor.HttpContext?.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY]
            is not UserDto user
        )
        {
            return Task.CompletedTask;
        }

        if (user.IsAdmin())
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
