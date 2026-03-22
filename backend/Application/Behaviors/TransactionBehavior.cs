using Application.Interfaces;
using MediatR;
using Serilog;

namespace Application.Behaviors;

/// <summary>
/// Behavior that manages database transactions for MediatR requests
/// </summary>
/// <typeparam name="TRequest">The type of request being handled</typeparam>
/// <typeparam name="TResponse">The type of response from the request</typeparam>
public class TransactionBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly ITransactionManager _transactionManager;

    public TransactionBehavior(ITransactionManager transactionManager)
    {
        _transactionManager =
            transactionManager ?? throw new ArgumentNullException(nameof(transactionManager));
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);
        ArgumentNullException.ThrowIfNull(next);

        var typeName = request.GetType().Name;
        var transactionId = Guid.Empty;

        try
        {
            // Only start a new transaction if one isn't already in progress
            if (_transactionManager.HasActiveTransaction)
            {
                Log.Information(
                    "Using existing transaction for {RequestType} ({@Request})",
                    typeName,
                    request
                );
                return await next(cancellationToken);
            }

            transactionId = (
                await _transactionManager.BeginTransactionAsync(cancellationToken)
            ).GetValueOrDefault();
            Log.Information(
                "Started transaction {TransactionId} for {RequestType} ({@Request})",
                transactionId,
                typeName,
                request
            );

            // Execute the request handler
            var response = await next(cancellationToken);

            // Only commit if we started the transaction
            if (transactionId != Guid.Empty)
            {
                Log.Information(
                    "Committing transaction {TransactionId} for {RequestType}. Response: {@Response}",
                    transactionId,
                    typeName,
                    response
                );

                await _transactionManager.CommitTransactionAsync(cancellationToken);
            }

            return response;
        }
        catch (Exception ex)
        {
            // Only rollback if we started the transaction
            if (transactionId != Guid.Empty)
            {
                Log.Error(
                    ex,
                    "Rolling back transaction {TransactionId} for {RequestType}. Request: {@Request}",
                    transactionId,
                    typeName,
                    request
                );

                await _transactionManager.RollbackTransactionAsync(cancellationToken);
            }
            else
            {
                Log.Error(
                    ex,
                    "Error processing {RequestType} without transaction. Request: {@Request}",
                    typeName,
                    request
                );
            }

            throw;
        }
    }
}
