using System.Reflection;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BlogAPI.GraphQL;

internal static class GraphQLServerExtensions
{
    internal const string GRAPHQL_NAMESPACE_PREFIX = "BlogAPI.GraphQL";

    public static IRequestExecutorBuilder AddGraphQLTypeExtensions(
        this IRequestExecutorBuilder builder,
        Assembly assembly
    )
    {
        var graphQlTypes = DiscoverGraphQLTypes(assembly).ToList();

        // [QueryType]/[MutationType]/[SubscriptionType] mark operation type extensions.
        // Only register a root when an extension for that operation exists.
        if (graphQlTypes.Exists(static t => t.IsDefined(typeof(QueryTypeAttribute), false)))
            builder.AddQueryType();

        if (graphQlTypes.Exists(static t => t.IsDefined(typeof(MutationTypeAttribute), false)))
            builder.AddMutationType();

        if (graphQlTypes.Exists(static t => t.IsDefined(typeof(SubscriptionTypeAttribute), false)))
            builder.AddSubscriptionType();

        foreach (var type in graphQlTypes)
            builder.AddType(type);

        return builder;
    }

    internal static IEnumerable<Type> DiscoverGraphQLTypes(Assembly assembly) =>
        GetLoadableTypes(assembly)
            .Where(t =>
                t.IsClass
                && !t.IsInterface
                && !t.IsGenericTypeDefinition
                && t.Namespace is not null
                && t.Namespace.StartsWith(GRAPHQL_NAMESPACE_PREFIX, StringComparison.Ordinal)
                && (
                    t.IsDefined(typeof(QueryTypeAttribute), false)
                    || t.IsDefined(typeof(MutationTypeAttribute), false)
                    || t.IsDefined(typeof(SubscriptionTypeAttribute), false)
                    || t.IsDefined(typeof(ExtendObjectTypeAttribute), false) // non-root type extensions, e.g. computed fields on entity types
                )
            )
            .OrderBy(t => t.FullName, StringComparer.Ordinal);

    private static Type[] GetLoadableTypes(Assembly assembly)
    {
        try
        {
            return assembly.GetTypes();
        }
        catch (ReflectionTypeLoadException ex)
        {
            var loaderMessages = string.Join(
                "; ",
                ex.LoaderExceptions.Where(e => e is not null).Select(e => e!.Message)
            );
            throw new InvalidOperationException(
                $"One or more types in '{assembly.FullName}' failed to load. "
                    + $"GraphQL schema registration aborted. Loader exceptions: {loaderMessages}",
                ex
            );
        }
    }
}
