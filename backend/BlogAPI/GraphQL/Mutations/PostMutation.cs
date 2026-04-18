using System.Diagnostics.CodeAnalysis;
using Application.Commands.Posts;
using Application.Common.Dtos;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Errors;
using HotChocolate.Authorization;
using MediatR;

namespace BlogAPI.GraphQL.Mutations;

[MutationType]
internal static class PostMutation
{
    [Authorize]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<PostDto> CreatePostAsync(
        CreatePostInput input,
        [Service] IMediator mediator,
        IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new CreatePostCommand(
            title: input.Title,
            thumbnail: input.Thumbnail,
            content: input.Content,
            excerpt: input.Excerpt,
            authorId: contextUser.Id,
            tags: input.Tags
        );

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }
}

[SuppressMessage(
    "CodeQuality",
    "CA1812:Avoid uninstantiated internal classes",
    Justification = "Used by Hot Chocolate GraphQL reflection"
)]
[SuppressMessage(
    "Design",
    "CA1515:Because an application's API isn't typically referenced from outside the assembly, types can be made internal",
    Justification = "Must be public for Hot Chocolate schema type inference"
)]
public sealed record CreatePostInput(
    string Title,
    string Thumbnail,
    string Content,
    string Excerpt,
    IEnumerable<string> Tags
);
