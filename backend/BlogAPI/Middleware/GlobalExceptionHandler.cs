using System.Net;
using Application.Common;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace BlogAPI.Middleware;

#pragma warning disable CA1812 // Class is instantiated via dependency injection
internal sealed class GlobalExceptionHandler : IExceptionHandler
#pragma warning restore CA1812
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        if (exception is ValidationException validationException)
        {
            Log.Warning(validationException, "Validation exception occurred");

            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

            var errors = validationException
                .Errors.Select(x => new AppError(x.Severity.ToString(), x.ErrorMessage))
                .ToList();

            await httpContext.Response.WriteAsJsonAsync(errors, cancellationToken);

            return true;
        }

        Log.Error(exception, "An unhandled exception occurred");

        var problemDetails = new ProblemDetails
        {
            Status = (int)HttpStatusCode.InternalServerError,
            Title = "An unexpected error occurred",
        };

        httpContext.Response.StatusCode = problemDetails.Status.Value;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}
