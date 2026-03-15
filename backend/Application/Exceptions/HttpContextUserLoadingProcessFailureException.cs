using System;

namespace Application.Exceptions;

public class HttpContextUserLoadingProcessFailureException : Exception
{
    public HttpContextUserLoadingProcessFailureException(string message)
        : base(message) { }

    public HttpContextUserLoadingProcessFailureException() { }

    public HttpContextUserLoadingProcessFailureException(string message, Exception innerException)
        : base(message, innerException) { }
}
