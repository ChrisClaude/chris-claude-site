using System.Diagnostics.CodeAnalysis;
using System.Net;
using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;

namespace BlogAPI.GraphQL;

[SuppressMessage(
    "Performance",
    "CA1812",
    Justification = "Instantiated by DI via generic registration"
)]
internal sealed class GraphQLHttpResponseFormatter : DefaultHttpResponseFormatter
{
    protected override HttpStatusCode OnDetermineStatusCode(
        IOperationResult result,
        FormatInfo format,
        HttpStatusCode? proposedStatusCode
    )
    {
        ArgumentNullException.ThrowIfNull(result);

        if (result.Errors is { Count: > 0 } errors)
        {
            if (errors.Any(e => e.Code is "AUTH_NOT_AUTHENTICATED" or "UNAUTHENTICATED"))
                return HttpStatusCode.Unauthorized;

            if (errors.Any(e => e.Code is "AUTH_NOT_AUTHORIZED"))
                return HttpStatusCode.Forbidden;
        }

        return base.OnDetermineStatusCode(result, format, proposedStatusCode);
    }
}
