using BlogAPI.GraphQL.Errors;

namespace BlogAPI.Extensions;

internal static class ResultExtensions
{
    /// <summary>
    /// Returns the result value, or throws a <see cref="GraphQLException"/> mapping all errors.
    /// Use in query resolvers.
    /// </summary>
    public static T GetValueOrThrow<T>(this Application.Common.Result<T> result)
    {
        if (result.IsFailure)
        {
            throw new GraphQLException(
                result
                    .Errors.Select(e =>
                        ErrorBuilder.New().SetMessage(e.Description).SetCode(e.Code).Build()
                    )
                    .ToList()
            );
        }

        return result.Value;
    }

    /// <summary>
    /// Returns the result value, or throws a <see cref="DomainException"/> from the first error.
    /// Use in mutation resolvers.
    /// </summary>
    public static T GetValueOrThrowDomain<T>(this Application.Common.Result<T> result)
    {
        if (result.IsFailure)
        {
            var firstError = result.Errors.First();
            throw new DomainException(firstError.Description, firstError.Code);
        }

        return result.Value;
    }
}
