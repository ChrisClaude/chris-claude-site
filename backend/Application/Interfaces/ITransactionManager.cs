namespace Application.Interfaces;

public interface ITransactionManager : IDisposable, IAsyncDisposable
{
    /// <summary>
    /// Indicates whether there is an active transaction
    /// </summary>
    bool HasActiveTransaction { get; }

    /// <summary>
    /// Begins a new transaction
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Transaction ID if a new transaction was started, null if there was already an active transaction</returns>
    Task<Guid?> BeginTransactionAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Commits the current transaction
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <exception cref="InvalidOperationException">Thrown when there is no active transaction</exception>
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Rolls back the current transaction
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <exception cref="InvalidOperationException">Thrown when there is no active transaction</exception>
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
}
