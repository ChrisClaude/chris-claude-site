using Application.Commands.Users;
using Application.Common.Dtos;
using Application.Enums;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Errors;
using BlogAPI.Storage;
using HotChocolate.Authorization;
using MediatR;

namespace BlogAPI.GraphQL.Mutations;

[MutationType(IncludeStaticMembers = true)]
public sealed class UserMutation
{
    /// <summary>
    /// Returns a short-lived SAS upload URL so the client can PUT the image
    /// directly to blob storage, keeping binary data out of the GraphQL layer.
    /// </summary>
    [Authorize]
    [Error(typeof(UserContextError))]
    public static async Task<ImageUploadToken> RequestImageUploadUrlAsync(
        string fileName,
        string contentType,
        [Service] IBlobStorageService blobStorageService,
        [Service] IHttpContextAccessor httpContextAccessor,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);

        var contextUser = httpContextAccessor.GetRequiredUser();

        var sanitizedFileName = System.IO.Path.GetFileName(fileName);
        var blobName = $"users/{contextUser.Id}/{Guid.NewGuid():N}_{sanitizedFileName}";

        var token = await blobStorageService.GenerateUploadTokenAsync(
            containerName: "profile-images",
            blobName: blobName,
            contentType: contentType,
            cancellationToken: cancellationToken
        );

        return new ImageUploadToken(token.UploadUrl, token.BlobUrl);
    }

    [Authorize]
    [Error(typeof(UserContextError))]
    [Error(typeof(DomainError))]
    public static async Task<UserDto> UpdateUserAsync(
        UpdateUserInput input,
        [Service] IMediator mediator,
        [Service] IHttpContextAccessor httpContextAccessor,
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

    [Authorize(Policy = AuthPolicy.ADMIN)]
    [Error(typeof(DomainError))]
    public static async Task<UserDto> AdminUpdateUserAsync(
        AdminUpdateUserInput input,
        [Service] IMediator mediator,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(input);

        var command = new UpdateUserCommand
        {
            UserId = input.UserId,
            Name = input.Name,
            Surname = input.Surname,
            Image = input.Image,
        };

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }

    [Authorize(Policy = AuthPolicy.ADMIN)]
    [Error(typeof(DomainError))]
    public static async Task<UserDto> AdminUpdateUserRolesAsync(
        AdminUpdateUserRolesInput input,
        [Service] IMediator mediator,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(input);

        var command = new UpdateUserRolesCommand { UserId = input.UserId, Roles = input.Roles };

        var result = await mediator.Send(command, cancellationToken);

        return result.GetValueOrThrowDomain();
    }
}

public sealed record UpdateUserInput(string Name, string Surname, string? Image);

public sealed record ImageUploadToken(Uri UploadUrl, Uri BlobUrl);

public sealed record AdminUpdateUserInput(Guid UserId, string Name, string Surname, string? Image);

public sealed record AdminUpdateUserRolesInput(Guid UserId, IEnumerable<string> Roles);
