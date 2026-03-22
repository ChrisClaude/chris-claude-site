using Application.Common;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Extensions;

internal static class ResultExtensions
{
    private static IActionResult HandleError(IEnumerable<AppError> errors, ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.NotFound => new NotFoundObjectResult(errors),
            ErrorType.InternalServerError => new StatusCodeResult(500),
            ErrorType.BadRequest => new BadRequestObjectResult(errors),
            ErrorType.Unauthorized => new UnauthorizedObjectResult(errors),
            _ => throw new ArgumentOutOfRangeException(nameof(errorType)),
        };
    }

    private static IActionResult HandleSuccess<T>(
        ResultSuccessType successType,
        T? value,
        string? actionName = null,
        string? controllerName = null,
        object? routeValues = null
    )
    {
        return successType switch
        {
            ResultSuccessType.Retrieved => value is not null
                ? new OkObjectResult(value)
                : new OkResult(),
            ResultSuccessType.Created => new CreatedAtActionResult(
                actionName,
                controllerName,
                routeValues,
                value
            ),
            ResultSuccessType.Updated => value is not null
                ? new OkObjectResult(value)
                : new NoContentResult(),
            ResultSuccessType.Deleted => new NoContentResult(),
            _ => throw new ArgumentOutOfRangeException(nameof(successType)),
        };
    }

    public static IActionResult ToActionResult<T>(
        this Result<T> result,
        string? actionName = null,
        string? controllerName = null,
        object? routeValues = null
    )
    {
        return result.IsSuccess
            ? HandleSuccess(
                result.SuccessType,
                result.Value,
                actionName,
                controllerName,
                routeValues
            )
            : HandleError(result.Errors, result.ErrorType);
    }

    public static IActionResult ToActionResult(
        this Result result,
        string? actionName = null,
        string? controllerName = null,
        object? routeValues = null
    )
    {
        return result.IsSuccess
            ? HandleSuccess<object>(
                result.SuccessType,
                null,
                actionName,
                controllerName,
                routeValues
            )
            : HandleError(result.Errors, result.ErrorType);
    }
}
