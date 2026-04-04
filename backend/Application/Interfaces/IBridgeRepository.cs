namespace Application.Interfaces;

public interface IBridgeRepository<TEntity>
{
    Task<IList<TEntity>> GetAllAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null
    );

    Task InsertAsync(TEntity entity);

    Task InsertAsync(IList<TEntity> entities);

    Task UpdateAsync(TEntity entity);

    Task UpdateAsync(IList<TEntity> entities);

    Task DeleteAsync(TEntity entity);

    Task DeleteAsync(IList<TEntity> entities);
}
