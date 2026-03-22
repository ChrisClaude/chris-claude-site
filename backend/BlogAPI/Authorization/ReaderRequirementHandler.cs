using Application.Common.Dtos;
using Application.Common.Extensions;
using Application.Enums;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Authorization;

internal sealed class ReaderRequirement : IAuthorizationRequirement { }

[System.Diagnostics.CodeAnalysis.SuppressMessage(
    "Performance",
    "CA1812:Avoid uninstantiated internal classes",
    Justification = "Instantiated via dependency injection"
)]
internal sealed class ReaderAuthorizationHandler : AuthorizationHandler<ReaderRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ReaderAuthorizationHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor =
            httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ReaderRequirement requirement
    )
    {
        if (
            _httpContextAccessor.HttpContext?.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY]
            is not UserDto user
        )
        {
            return Task.CompletedTask;
        }

        if (user.IsReader())
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
