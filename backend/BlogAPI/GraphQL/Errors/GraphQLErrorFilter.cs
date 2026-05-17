using Serilog;

namespace BlogAPI.GraphQL.Errors;

internal sealed class GraphQLErrorFilter : IErrorFilter
{
    public IError OnError(IError error)
    {
        if (error.Exception is not null)
        {
            Log.Error(error.Exception, "Unhandled GraphQL execution error: {Message}", error.Message);
        }

        return error;
    }
}
