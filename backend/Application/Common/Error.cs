namespace Application.Common;

public sealed record AppError(string Code, string Description)
{
    public static readonly AppError None = new(string.Empty, string.Empty);

    public override string ToString()
    {
        return $"{Code} - {Description}";
    }

    public static AppError InternalServerError(string? exceptionMessage = null)
    {
        if (string.IsNullOrEmpty(exceptionMessage))
        {
            exceptionMessage = "Server Error";
        }
        return new("internal-server-error", exceptionMessage);
    }

    public static AppError NotFound(string? exceptionMessage = null)
    {
        if (string.IsNullOrEmpty(exceptionMessage))
        {
            exceptionMessage = "Not Found";
        }
        return new("not-found", exceptionMessage);
    }

    public static AppError NotAuthorized(string? exceptionMessage = null)
    {
        if (string.IsNullOrEmpty(exceptionMessage))
        {
            exceptionMessage = "Not Authorized";
        }
        return new("not-authorized", exceptionMessage);
    }

    public static AppError InvalidArgument(string? exceptionMessage = null)
    {
        if (string.IsNullOrEmpty(exceptionMessage))
        {
            exceptionMessage = "Invalid Argument";
        }
        return new("invalid-argument", exceptionMessage);
    }

    public static AppError Conflict(string? errorMessage = null)
    {
        if (string.IsNullOrEmpty(errorMessage))
        {
            errorMessage = "Conflict";
        }
        return new("conflict", errorMessage);
    }

    public static AppError BadRequest(string? errorMessage = null)
    {
        if (string.IsNullOrEmpty(errorMessage))
        {
            errorMessage = "Bad Request";
        }
        return new("bad-request", errorMessage);
    }

    public static AppError ExternalServiceError(string? errorMessage = null)
    {
        if (string.IsNullOrEmpty(errorMessage))
        {
            errorMessage = "External Service Error";
        }
        return new("external-service-error", errorMessage);
    }

    public static AppError TooManyRequestsError(string? errorMessage = null)
    {
        if (string.IsNullOrEmpty(errorMessage))
        {
            errorMessage = "Too Many Requests";
        }
        return new("too-many-requests", errorMessage);
    }
}
