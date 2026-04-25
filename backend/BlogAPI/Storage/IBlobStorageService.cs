namespace BlogAPI.Storage;

public interface IBlobStorageService
{
    /// <summary>
    /// Generates a short-lived SAS URI for the client to upload a blob directly.
    /// </summary>
    Task<BlobUploadToken> GenerateUploadTokenAsync(
        string containerName,
        string blobName,
        string contentType,
        CancellationToken cancellationToken = default
    );

    /// <summary>
    /// Deletes a blob by its URL.
    /// </summary>
    Task DeleteBlobAsync(Uri blobUrl, CancellationToken cancellationToken = default);
}

public sealed record BlobUploadToken(Uri UploadUrl, Uri BlobUrl);
