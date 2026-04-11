using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Filters;
using BlogAPI.GraphQL.Sorting;
using HotChocolate.Authorization;

namespace BlogAPI.GraphQL.Queries;

[QueryType]
internal static class UserQuery
{
    [Authorize]
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<User> Me(
        [Service] IQueryableSource<User> source,
        IHttpContextAccessor httpContextAccessor
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        var contextUser = httpContextAccessor.GetRequiredUser();
        return source.Query().Where(u => u.Id == contextUser.Id);
    }

    [Authorize(Policy = AuthPolicy.ADMIN)]
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering(typeof(UserFilterType))]
    [UseSorting(typeof(UserSortType))]
    public static IQueryable<User> GetUsers([Service] IQueryableSource<User> source)
    {
        return source.Query();
    }
}
