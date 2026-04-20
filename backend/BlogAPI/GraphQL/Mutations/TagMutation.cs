using System.Diagnostics.CodeAnalysis;
using Application.Commands.Tags;
using Application.Common.Dtos;
using Application.Enums;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Errors;
using HotChocolate.Authorization;
using MediatR;

namespace BlogAPI.GraphQL.Mutations;

[MutationType]
internal static class TagMutation
{
    [Authorize(Policy = AuthPolicy.ADMIN)]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<TagDto> CreateTagAsync(
        CreateTagInput input,
        [Service] IMediator mediator,
        IHttpContextAccessor httpContextAccessor,
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
public sealed record CreateTagInput(string Name);
