using Application.Commands.Tags;
using Application.Common.Dtos;
using Application.Enums;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Errors;
using HotChocolate.Authorization;
using MediatR;

namespace BlogAPI.GraphQL.Mutations;

[MutationType(IncludeStaticMembers = true)]
public sealed class TagMutation
{
    [Authorize(Policy = AuthPolicy.ADMIN)]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<TagDto> CreateTagAsync(
        CreateTagInput input,
        [Service] IMediator mediator,
        [Service] IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(input);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var command = new CreateTagCommand(name: input.Name, createdByUserId: contextUser.Id);

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }
}

public sealed record CreateTagInput(string Name);
