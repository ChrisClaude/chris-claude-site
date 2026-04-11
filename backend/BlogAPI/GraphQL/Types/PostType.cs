using Application.Entities;
using BlogAPI.GraphQL.DataLoaders;

namespace BlogAPI.GraphQL.Types;

[ExtendObjectType(typeof(Post))]
internal static class PostType
{
    public static async Task<User?> GetAuthorAsync(
        [Parent] Post post,
        UserByIdDataLoader dataLoader,
        CancellationToken cancellationToken
    ) => await dataLoader.LoadAsync(post.AuthorId, cancellationToken);
}
