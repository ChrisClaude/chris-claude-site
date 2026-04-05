using Application.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

#pragma warning disable IDE0058

public class BridgeEntityRepository<TEntity>(ApplicationDbContext context)
    : BaseEntityRepository<TEntity>(context),
        IBridgeRepository<TEntity>
    where TEntity : class
{
    public virtual async Task<IList<TEntity>> GetAllAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null
    )
    {
        var query = ApplyIncludes(Table, includes);
        query = func != null ? func(query) : query;
        return await query.ToListAsync();
    }

    public virtual async Task InsertAsync(TEntity entity)
    {
        await CoreInsertAsync(entity);
    }

    public virtual async Task InsertAsync(IList<TEntity> entities)
    {
        await CoreInsertAsync(entities);
    }

    public virtual async Task UpdateAsync(TEntity entity)
    {
        await CoreUpdateAsync(entity);
    }

    public virtual async Task UpdateAsync(IList<TEntity> entities)
    {
        await CoreUpdateAsync(entities);
    }

    public virtual async Task DeleteAsync(TEntity entity)
    {
        await CoreDeleteAsync(entity);
    }

    public virtual async Task DeleteAsync(IList<TEntity> entities)
    {
        await CoreDeleteAsync(entities);
    }
}

#pragma warning restore IDE0058
