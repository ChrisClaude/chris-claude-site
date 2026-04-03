using Application.Common.Extensions;
using BlogAPI.Extensions;
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
        var user = _httpContextAccessor.GetUser();
        if (user is null)
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
