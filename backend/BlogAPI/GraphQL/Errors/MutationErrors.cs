namespace BlogAPI.GraphQL.Errors;

// Exceptions thrown by mutation resolvers
// S3871 suppressed: exceptions are intentionally internal per CA1515 (application assembly)
#pragma warning disable S3871
internal sealed class UserContextException : Exception
{
    public UserContextException()
        : base("User details not found in the request context.") { }

    public UserContextException(string message) : base(message) { }

    public UserContextException(string message, Exception innerException) : base(message, innerException) { }
}

internal sealed class DomainException : Exception
{
    public DomainException() : base() { }

    public DomainException(string message) : base(message) { }

    public DomainException(string message, Exception innerException) : base(message, innerException) { }

    public DomainException(string message, string code) : base(message)
    {
        Code = code;
    }

    public string Code { get; } = string.Empty;
}
#pragma warning restore S3871

// GraphQL error POCOs — define exactly what fields appear in the schema.
// HC maps each exception to its error type via the constructor.
// CA1812 suppressed: instantiated by HotChocolate via reflection
#pragma warning disable CA1812
internal sealed class UserContextError
{
    public UserContextError(UserContextException ex) => Message = ex.Message;

    public string Message { get; }
}

internal sealed class DomainError
{
    public DomainError(DomainException ex)
    {
        Message = ex.Message;
        Code = ex.Code;
    }

    public string Message { get; }
    public string Code { get; }
}
#pragma warning restore CA1812
