using Aspire.Hosting;

namespace Application.IntegrationTests;

/// <summary>
/// Boots the ChrisClaude AppHost once for the whole integration-test run.
/// Building the distributed application starts a SQL Server container, the Azure
/// Storage emulator and the migration worker, which is far too expensive to do
/// per test. Integration tests share this instance through
/// <see cref="AppHostCollection"/>.
/// </summary>
#pragma warning disable CA1515 // xUnit fixtures must be public to be discovered.
public sealed class AppHostFixture : IAsyncLifetime
#pragma warning restore CA1515
{
    private static readonly TimeSpan StartTimeout = TimeSpan.FromMinutes(5);

    /// <summary>The running distributed application under test.</summary>
    public DistributedApplication App { get; private set; } = null!;

    /// <inheritdoc />
    public async Task InitializeAsync()
    {
        // Skip the Next.js dev server and GraphQL codegen. Those need Node and
        // write into the frontend folder, so the AppHost reads this switch and
        // leaves them out when it is booted from tests.
        Environment.SetEnvironmentVariable("IncludeFrontend", "false");

        var builder = await DistributedApplicationTestingBuilder
            .CreateAsync<Projects.ChrisClaude_AppHost>();

        App = await builder.BuildAsync().WaitAsync(StartTimeout);
        await App.StartAsync().WaitAsync(StartTimeout);
    }

    /// <inheritdoc />
    public async Task DisposeAsync()
    {
        if (App is not null)
        {
            await App.DisposeAsync();
        }
    }
}

/// <summary>
/// xUnit collection that shares a single <see cref="AppHostFixture"/> across all
/// integration-test classes so the AppHost is only started once.
/// </summary>
[CollectionDefinition(Name)]
#pragma warning disable CA1515, CA1711, S2094 // Public, "Collection"-suffixed empty marker required by xUnit.
public sealed class AppHostCollection : ICollectionFixture<AppHostFixture>
#pragma warning restore CA1515, CA1711, S2094
{
    /// <summary>The collection name referenced by <c>[Collection]</c> attributes.</summary>
    public const string Name = "AppHost";
}
