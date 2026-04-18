using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Filters;
using BlogAPI.GraphQL.Sorting;
using HotChocolate.Authorization;

namespace BlogAPI.GraphQL.Queries;

[QueryType]
internal static class PostQuery
{
    [Authorize]
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering(typeof(PostFilterType))]
    [UseSorting(typeof(PostSortType))]
    public static IQueryable<Post> GetPosts([Service] IQueryableSource<Post> source)
    {
        return source.Query().Where(p => p.Status == PostStatus.Published);
    }

    [Authorize]
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering(typeof(PostFilterType))]
    [UseSorting(typeof(PostSortType))]
    public static IQueryable<Post> GetMyPosts(
        [Service] IQueryableSource<Post> source,
        IHttpContextAccessor httpContextAccessor
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        var user = httpContextAccessor.GetRequiredUser();
        return source.Query().Where(p => p.AuthorId == user.Id);
    }

    [Authorize(Policy = AuthPolicy.ADMIN)]
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering(typeof(PostFilterType))]
    [UseSorting(typeof(PostSortType))]
    public static IQueryable<Post> GetAllPostsAdmin([Service] IQueryableSource<Post> source)
    {
        return source.Query();
    }
}
