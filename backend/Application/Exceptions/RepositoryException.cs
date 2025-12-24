namespace Application.Exceptions;

public class RepositoryException : Exception
{
    public RepositoryException()
        : base("An error occurred during the repository operation.") { }

    public RepositoryException(string message, Exception innerException)
        : base(message, innerException) { }

    public RepositoryException(string message)
        : base(message) { }
}
