using Application.Entities;
using Application.Enums;
using Application.Interfaces;
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
}
