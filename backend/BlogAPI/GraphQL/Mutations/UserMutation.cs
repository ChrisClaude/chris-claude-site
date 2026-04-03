using System.Diagnostics.CodeAnalysis;
using Application.Commands.Users;
using Application.Common.Dtos;
using BlogAPI.Extensions;
using BlogAPI.GraphQL.Errors;
using BlogAPI.Storage;
using HotChocolate.Authorization;
using MediatR;

namespace BlogAPI.GraphQL.Mutations;

[MutationType]
internal static class UserMutation
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
        IHttpContextAccessor httpContextAccessor,
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

        if (result.IsFailure)
        {
            var firstError = result.Errors.First();
            throw new DomainException(firstError.Description, firstError.Code);
        }

        return result.Value;
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
public sealed record UpdateUserInput(string Name, string Surname, string? Image);

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
public sealed record ImageUploadToken(Uri UploadUrl, Uri BlobUrl);
