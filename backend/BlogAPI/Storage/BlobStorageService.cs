using System.Diagnostics.CodeAnalysis;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;

namespace BlogAPI.Storage;

[SuppressMessage(
    "CodeQuality",
    "CA1812:Avoid uninstantiated internal classes",
    Justification = "Registered in DI container and instantiated by dependency injection"
)]
internal sealed class BlobStorageService(BlobServiceClient blobServiceClient) : IBlobStorageService
{
    private static readonly TimeSpan _uploadSasTtl = TimeSpan.FromMinutes(10);

    public async Task<BlobUploadToken> GenerateUploadTokenAsync(
        string containerName,
        string blobName,
        string contentType,
        CancellationToken cancellationToken = default
    )
    {
        var container = blobServiceClient.GetBlobContainerClient(containerName);
        await container.CreateIfNotExistsAsync(
            PublicAccessType.Blob,
            cancellationToken: cancellationToken
        );

        var blob = container.GetBlobClient(blobName);

        var sasBuilder = new BlobSasBuilder
        {
            BlobContainerName = containerName,
            BlobName = blobName,
            Resource = "b",
            ExpiresOn = DateTimeOffset.UtcNow.Add(_uploadSasTtl),
        };
        sasBuilder.SetPermissions(BlobSasPermissions.Write | BlobSasPermissions.Create);
        sasBuilder.ContentType = contentType;

        var uploadUri = blob.GenerateSasUri(sasBuilder);

        return new BlobUploadToken(uploadUri, blob.Uri);
    }

    public async Task DeleteBlobAsync(Uri blobUrl, CancellationToken cancellationToken = default)
    {
        var blobClient = new BlobClient(blobUrl);
        var container = blobServiceClient.GetBlobContainerClient(blobClient.BlobContainerName);
        await container
            .GetBlobClient(blobClient.Name)
            .DeleteIfExistsAsync(cancellationToken: cancellationToken);
    }
}
