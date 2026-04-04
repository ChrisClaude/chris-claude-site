using Application.Common.Dtos;
using Application.Interfaces.Queries;
using BlogAPI.Extensions;
using HotChocolate.Authorization;

namespace BlogAPI.GraphQL.Queries;

[QueryType]
internal static class PostQuery
{
    [Authorize]
    public static async Task<PagedListDto<PostDto>> GetPostsAsync(
        int page,
        int pageSize,
        [Service] IPostQueries postQueries
    )
    {
        ArgumentNullException.ThrowIfNull(postQueries);

        var result = await postQueries.GetPostsAsync(page, pageSize);

        return result.GetValueOrThrow();
    }
}
