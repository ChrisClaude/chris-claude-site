using System.Net;
using Aspire.Hosting;
using ChrisClaude.Aspire;

namespace Application.IntegrationTests;

/// <summary>
/// End-to-end checks that boot the whole distributed application (SQL Server,
/// storage emulator, migrations and the BlogAPI) and exercise it over HTTP.
/// </summary>
[Collection(AppHostCollection.Name)]
[Trait("Category", "Integration")]
public sealed class BlogApiEndpointTests
{
    private static readonly TimeSpan ReadyTimeout = TimeSpan.FromMinutes(3);

    private readonly AppHostFixture _fixture;

    public BlogApiEndpointTests(AppHostFixture fixture) => _fixture = fixture;

    [Fact]
    public async Task HealthEndpoint_ReturnsOkAsync()
    {
        await _fixture.App.ResourceNotifications
            .WaitForResourceHealthyAsync(ChrisClaudeResourceNames.BLOG_API)
            .WaitAsync(ReadyTimeout);

        using var client = _fixture.App.CreateHttpClient(ChrisClaudeResourceNames.BLOG_API);

        using var response = await client.GetAsync(new Uri("/healthz", UriKind.Relative));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GraphQlEndpoint_ExecutesIntrospectionQueryAsync()
    {
        await _fixture.App.ResourceNotifications
            .WaitForResourceHealthyAsync(ChrisClaudeResourceNames.BLOG_API)
            .WaitAsync(ReadyTimeout);

        using var client = _fixture.App.CreateHttpClient(ChrisClaudeResourceNames.BLOG_API);

        using var content = new StringContent(
            "{\"query\":\"{ __schema { queryType { name } } }\"}",
            System.Text.Encoding.UTF8,
            "application/json");

        using var response = await client.PostAsync(new Uri("/graphql", UriKind.Relative), content);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"queryType\"", body, StringComparison.Ordinal);
    }
}
