using Application.Commands.Bookmarks;
using Application.Common.Dtos;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Errors;
using HotChocolate.Authorization;
using MediatR;

namespace BlogAPI.GraphQL.Mutations;

[MutationType(IncludeStaticMembers = true)]
public sealed class BookmarkMutation
{
    [Authorize]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<BookmarkDto> AddBookmarkAsync(
        AddBookmarkInput input,
        [Service] IMediator mediator,
        [Service] IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new AddBookmarkCommand(
            postId: input.PostId,
            userId: contextUser.Id
        );

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }

    [Authorize]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<BookmarkDto> RemoveBookmarkAsync(
        RemoveBookmarkInput input,
        [Service] IMediator mediator,
        [Service] IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new RemoveBookmarkCommand(
            postId: input.PostId,
            userId: contextUser.Id
        );

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }
}

public sealed record AddBookmarkInput(Guid PostId);

public sealed record RemoveBookmarkInput(Guid PostId);
