using System;
using System.Text.Json.Serialization;
using Error = Application.Common.AppError;

namespace Application.Common;

public class Result
{
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public IEnumerable<Error> Errors { get; }

    [JsonIgnore]
    public ErrorType ErrorType { get; }
    public ResultSuccessType SuccessType { get; }

    public Result()
    {
        IsSuccess = true;
        Errors = new List<Error>();
        ErrorType = ErrorType.None;
    }

    protected Result(
        bool isSuccess,
        IEnumerable<Error> errors,
        ErrorType errorType,
        ResultSuccessType successType = ResultSuccessType.Retrieved
    )
    {
        errors ??= new List<Error>();

        if ((isSuccess && errors.Any()) || (!isSuccess && (errors is null || !errors.Any())))
        {
            throw new ArgumentException("Invalid arguments", nameof(errors));
        }

        IsSuccess = isSuccess;
        Errors = errors;
        ErrorType = errorType;
        SuccessType = successType;
    }

    public static Result Success(ResultSuccessType successType = ResultSuccessType.Retrieved)
    {
        return new Result(true, new List<Error>(), ErrorType.None, successType);
    }

    public static Result<T> Success<T>(T value)
    {
        return Result<T>.CreateSuccess(value);
    }

    public static Result Failure(IEnumerable<Error> errors, ErrorType errorType)
    {
        return new Result(false, errors, errorType);
    }

    public static Result<T> Failure<T>(IEnumerable<Error> errors, ErrorType errorType)
    {
        return Result<T>.CreateFailure(errors, errorType);
    }
}

public class Result<T> : Result
{
    // Stored as nullable so failures don't require a real value.
    private readonly T? _value;

    // Safe accessor — throws if accessed on a failure.
    // Always check IsSuccess before using this property.
    public T Value =>
        IsSuccess
            ? _value! // Non-null guaranteed: CreateSuccess enforces a real value was provided.
            : throw new InvalidOperationException("Cannot access Value on a failed Result.");

    // Use this when you intentionally want null/default without checking IsSuccess,
    // e.g. serialization, mapping, or when you handle null yourself.
    public T? ValueOrDefault => _value;

    private Result(bool isSuccess, IEnumerable<Error> error, ErrorType errorType, T? result)
        : base(isSuccess, error, errorType)
    {
        _value = result;
    }

    internal static Result<T> CreateSuccess(T value)
    {
        // Enforce non-null at runtime so Value is always safe to access on success.
        ArgumentNullException.ThrowIfNull(value);
        return new Result<T>(true, new List<Error>(), ErrorType.None, value);
    }

    internal static Result<T> CreateFailure(IEnumerable<Error> errors, ErrorType errorType)
    {
        // No value on failure; default(T) satisfies the backing field without exposing it.
        return new Result<T>(false, errors, errorType, default);
    }
}
