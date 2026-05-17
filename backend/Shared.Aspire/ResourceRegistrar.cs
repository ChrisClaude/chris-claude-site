using Aspire.Hosting;
using Aspire.Hosting.ApplicationModel;
using Aspire.Hosting.Azure;

namespace ChrisClaude.Aspire;

/// <summary>
/// Well-known resource names for the ChrisClaude distributed application.
/// Use these constants when registering or referencing resources across AppHost projects.
/// </summary>
public static class ChrisClaudeResourceNames
{
    /// <summary>The blog API resource name used for service discovery.</summary>
    public const string BLOG_API = "blog-api";

    /// <summary>The SQL Server container resource name.</summary>
    public const string SQL_SERVER = "sqlserver";

    /// <summary>The blog database resource name.</summary>
    public const string BLOG_DATABASE = "blog-db";

    /// <summary>The Azure Storage emulator resource name.</summary>
    public const string STORAGE = "storage";

    /// <summary>The Azure Blob Storage resource name.</summary>
    public const string BLOBS = "blobs";

    /// <summary>The database migration worker resource name.</summary>
    public const string MIGRATIONS = "migrations";
}

/// <summary>
/// Holds the shared ChrisClaude infrastructure resource builders returned by
/// <see cref="ResourceRegistrar.AddChrisClaudeInfrastructure"/>.
/// Pass <see cref="Database"/> and <see cref="Blobs"/> to <c>WithReference</c> when
/// registering the MigrationService and BlogAPI projects.
/// </summary>
/// <param name="Database">The blog SQL Server database resource builder.</param>
/// <param name="Blobs">The Azure Blob Storage resource builder.</param>
public record ChrisClaudeInfrastructure(
    IResourceBuilder<SqlServerDatabaseResource> Database,
    IResourceBuilder<AzureBlobStorageResource> Blobs
);

/// <summary>
/// Shared Aspire hosting extensions used across multiple AppHost projects.
/// </summary>
public static class ResourceRegistrar
{
    /// <summary>
    /// Adds the shared ChrisClaude infrastructure: a SQL Server container with the blog
    /// database, and an Azure Storage emulator with a blob container.
    /// Both resources use data volumes so state persists across restarts.
    /// </summary>
    /// <param name="builder">The distributed application builder.</param>
    /// <returns>
    /// A <see cref="ChrisClaudeInfrastructure"/> with the <c>Database</c> and <c>Blobs</c>
    /// builders to pass to <c>WithReference</c> on MigrationService and BlogAPI.
    /// </returns>
    public static ChrisClaudeInfrastructure AddChrisClaudeInfrastructure(
        this IDistributedApplicationBuilder builder)
    {
        var sqlServer = builder
            .AddSqlServer(ChrisClaudeResourceNames.SQL_SERVER)
            .WithDataVolume();

        var database = sqlServer.AddDatabase(ChrisClaudeResourceNames.BLOG_DATABASE);

        var storage = builder
            .AddAzureStorage(ChrisClaudeResourceNames.STORAGE)
            .RunAsEmulator(e => e.WithDataVolume().WithBlobPort(10000));

        var blobs = storage.AddBlobs(ChrisClaudeResourceNames.BLOBS);

        return new ChrisClaudeInfrastructure(database, blobs);
    }

    /// <summary>
    /// Adds a reference to the ChrisClaude blog API as an external connection string.
    /// The consuming service receives a <c>ConnectionStrings__blog-api</c> environment variable.
    /// Configure the URL in the AppHost's <c>appsettings.Development.json</c> under
    /// <c>ConnectionStrings:blog-api</c>.
    /// </summary>
    /// <param name="builder">The distributed application builder.</param>
    /// <returns>A resource builder for the external blog API connection string.</returns>
    public static IResourceBuilder<IResourceWithConnectionString> AddBlogApiReference(
        this IDistributedApplicationBuilder builder
    )
    {
        return builder.AddConnectionString(ChrisClaudeResourceNames.BLOG_API);
    }
}
