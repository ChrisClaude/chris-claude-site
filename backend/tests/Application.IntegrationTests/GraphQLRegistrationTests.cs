using BlogAPI.GraphQL;
using BlogAPI.GraphQL.Queries;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;

namespace Application.IntegrationTests;

public class GraphQLRegistrationTests
{
    private static readonly System.Reflection.Assembly _blogApiAssembly =
        typeof(GraphQLServerExtensions).Assembly;

    [Fact]
    public async Task DirectTypeExtension_BuildsSchemaAsync()
    {
        await using var provider = new ServiceCollection()
            .AddGraphQLServer()
            .AddQueryType()
            .AddType<PostQuery>()
            .AddAuthorization()
            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .Services.BuildServiceProvider();

        var executor = await provider
            .GetRequiredService<IRequestExecutorResolver>()
            .GetRequestExecutorAsync();

        var queryFields = executor.Schema.QueryType.Fields
            .Where(f => !f.IsIntrospectionField)
            .Select(f => f.Name)
            .ToHashSet(StringComparer.Ordinal);

        Assert.Contains("posts", queryFields);
    }

    [QueryType(IncludeStaticMembers = true)]
#pragma warning disable CA1812, S1118
    internal sealed class MinimalQuery
    {
        public static string Hello() => "world";
    }
#pragma warning restore CA1812, S1118

    [Fact]
    public async Task MinimalInlineQuery_BuildsSchemaAsync()
    {
        await using var provider = new ServiceCollection()
            .AddGraphQLServer()
            .AddQueryType()
            .AddType<MinimalQuery>()
            .Services.BuildServiceProvider();

        var executor = await provider
            .GetRequiredService<IRequestExecutorResolver>()
            .GetRequestExecutorAsync();

        var queryFields = executor.Schema.QueryType.Fields
            .Where(f => !f.IsIntrospectionField)
            .Select(f => f.Name)
            .ToHashSet(StringComparer.Ordinal);

        Assert.Contains("hello", queryFields);
    }

    [Fact]
    public void DiscoverGraphQLTypes_FindsExpectedTypes()
    {
        var types = GraphQLServerExtensions.DiscoverGraphQLTypes(_blogApiAssembly).ToList();
        Assert.True(types.Count > 0, $"Expected to find GraphQL types but found 0. Assembly: {_blogApiAssembly.FullName}");
        var names = string.Join(", ", types.Select(t => t.FullName));
        Assert.True(types.Count >= 8, $"Expected >= 8 types but found {types.Count}: {names}");
    }

    [Fact]
    public async Task Schema_BuildsSuccessfully_WithAllExpectedRootFieldsAsync()
    {
        await using var provider = new ServiceCollection()
            .AddGraphQLServer()
            .AddGraphQLTypeExtensions(_blogApiAssembly)
            .AddMutationConventions()
            .AddAuthorization()
            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .Services.BuildServiceProvider();

        var executor = await provider
            .GetRequiredService<IRequestExecutorResolver>()
            .GetRequestExecutorAsync();

        var schema = executor.Schema;

        var queryFields = schema
            .QueryType.Fields.Where(f => !f.IsIntrospectionField)
            .Select(f => f.Name)
            .ToHashSet(StringComparer.Ordinal);

        Assert.Contains("posts", queryFields);
        Assert.Contains("myPosts", queryFields);
        Assert.Contains("allPostsAdmin", queryFields);
        Assert.Contains("tags", queryFields);
        Assert.Contains("myBookmarks", queryFields);
        Assert.Contains("me", queryFields);
        Assert.Contains("users", queryFields);

        var mutationFields = schema
            .MutationType!.Fields.Select(f => f.Name)
            .ToHashSet(StringComparer.Ordinal);

        Assert.Contains("createPost", mutationFields);
        Assert.Contains("updatePost", mutationFields);
        Assert.Contains("adminUpdatePostStatus", mutationFields);
        Assert.Contains("addBookmark", mutationFields);
        Assert.Contains("removeBookmark", mutationFields);
        Assert.Contains("createTag", mutationFields);
        Assert.Contains("updateUser", mutationFields);
        Assert.Contains("adminUpdateUser", mutationFields);
        Assert.Contains("adminUpdateUserRoles", mutationFields);
        Assert.Contains("requestImageUploadUrl", mutationFields);
    }
}
