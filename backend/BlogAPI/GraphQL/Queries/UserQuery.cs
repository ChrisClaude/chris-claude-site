using Application.Common.Dtos;
using Application.Enums;
using Application.Interfaces.Queries;
using BlogAPI.Extensions;
using HotChocolate.Authorization;

namespace BlogAPI.GraphQL.Queries;

[QueryType]
internal static class UserQuery
{
    [Authorize]
    public static async Task<UserDto> MeAsync(
        [Service] IUserQueries userQueries,
        IHttpContextAccessor httpContextAccessor
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(userQueries);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var result = await userQueries.GetUserAsync(contextUser.Id);

        return result.GetValueOrThrow();
    }

    [Authorize(Policy = AuthPolicy.ADMIN)]
    public static async Task<PagedListDto<UserDto>> GetUsersAsync(
        int page,
        int pageSize,
        [Service] IUserQueries userQueries
    )
    {
        ArgumentNullException.ThrowIfNull(userQueries);

        var result = await userQueries.GetUsersAsync(page, pageSize);

        return result.GetValueOrThrow();
    }
}
