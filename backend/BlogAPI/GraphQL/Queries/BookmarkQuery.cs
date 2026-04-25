using Application.Entities;
using BlogAPI.Extensions;
using HotChocolate.Authorization;
using Infrastructure.Data;

namespace BlogAPI.GraphQL.Queries;

[QueryType(IncludeStaticMembers = true)]
public sealed class BookmarkQuery
{
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Bookmark> GetMyBookmarks(
        // Bookmark is a bridge/composite-key entity that does not inherit BaseEntity,
        // so IQueryableSource<T> (constrained to BaseEntity) cannot be used here.
        // Direct DbContext access is the correct pattern for bridge entity queries.
        [Service] ApplicationDbContext context,
        [Service] IHttpContextAccessor httpContextAccessor
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        var user = httpContextAccessor.GetRequiredUser();
        return context.Bookmarks.Where(b => b.UserId == user.Id);
    }
}
