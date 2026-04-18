using System.Diagnostics.CodeAnalysis;
using Application.Commands.Posts;
using Application.Common.Dtos;
using Application.Enums;
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

    [Authorize]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<PostDto> UpdatePostAsync(
        UpdatePostInput input,
        [Service] IMediator mediator,
        IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new UpdatePostCommand(
            postId: input.PostId,
            requestingUserId: contextUser.Id,
            title: input.Title,
            thumbnail: input.Thumbnail,
            content: input.Content,
            excerpt: input.Excerpt,
            status: input.Status
        );

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }

    [Authorize(Policy = AuthPolicy.ADMIN)]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<PostDto> AdminUpdatePostStatusAsync(
        AdminUpdatePostStatusInput input,
        [Service] IMediator mediator,
        IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new AdminUpdatePostStatusCommand(
            postId: input.PostId,
            adminUserId: contextUser.Id,
            status: input.Status
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
public sealed record UpdatePostInput(
    Guid PostId,
    string Title,
    string Thumbnail,
    string Content,
    string Excerpt,
    PostStatus Status
);

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
public sealed record AdminUpdatePostStatusInput(Guid PostId, PostStatus Status);
