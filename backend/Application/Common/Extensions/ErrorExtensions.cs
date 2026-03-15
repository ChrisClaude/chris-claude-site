using Error = Application.Common.AppError;

namespace Application.Common.Extensions;

public static class ErrorExtensions
{
    /// <summary>
    /// Aggregates a collection of errors into a single string message
    /// </summary>
    /// <param name="errors">The collection of errors to aggregate</param>
    /// <param name="separator">Optional separator between errors (defaults to " ")</param>
    /// <returns>A concatenated string of all error messages</returns>
    public static string ToAggregateString(this IEnumerable<Error> errors, string separator = " ")
    {
        if (errors == null || !errors.Any())
            return string.Empty;

        return string.Join(separator, errors.Select(x => x.ToString()));
    }
}
