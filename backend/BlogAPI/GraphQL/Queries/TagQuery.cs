using Application.Interfaces;
using HotChocolate.Authorization;
using Tag = Application.Entities.Tag;

namespace BlogAPI.GraphQL.Queries;

[QueryType]
internal static class TagQuery
{
    [Authorize]
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Tag> GetTags([Service] IQueryableSource<Tag> source)
    {
        return source.Query();
    }
}
