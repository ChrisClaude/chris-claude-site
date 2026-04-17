using Application.Commands.Users;
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
    public static async Task<UserDto> CreatePostAsync(
        UpdateUserInput input,
        [Service] IMediator mediator,
        IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new UpdateUserCommand
        {
            UserId = contextUser.Id,
            Name = input.Name,
            Surname = input.Surname,
            Image = input.Image,
        };

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }
}
