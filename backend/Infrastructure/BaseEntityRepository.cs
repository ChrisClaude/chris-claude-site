using Application.Exceptions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

#pragma warning disable IDE0058

public abstract class BaseEntityRepository<TEntity>(ApplicationContext context)
    where TEntity : class
{
    protected ApplicationContext Context => context;

    protected IQueryable<TEntity> Table => context.Set<TEntity>();

    protected static IQueryable<TEntity> ApplyIncludes(
        IQueryable<TEntity> query,
        string[]? includes
    )
    {
        if (includes is null || includes.Length == 0)
            return query;

        foreach (var include in includes)
            query = query.Include(include);

        return query.AsSplitQuery();
    }

    protected async Task CoreInsertAsync(TEntity entity)
    {
        try
        {
            await context.Set<TEntity>().AddAsync(entity);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error inserting entity of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    protected async Task CoreInsertAsync(IList<TEntity> entities)
    {
        try
        {
            await context.Set<TEntity>().AddRangeAsync(entities);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error inserting entities of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    protected async Task CoreUpdateAsync(TEntity entity)
    {
        try
        {
            context.Set<TEntity>().Update(entity);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error updating entity of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    protected async Task CoreUpdateAsync(IList<TEntity> entities)
    {
        try
        {
            context.Set<TEntity>().UpdateRange(entities);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error updating entities of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    protected async Task CoreDeleteAsync(TEntity entity)
    {
        try
        {
            context.Set<TEntity>().Remove(entity);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error deleting entity of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    protected async Task CoreDeleteAsync(IList<TEntity> entities)
    {
        try
        {
            context.Set<TEntity>().RemoveRange(entities);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error deleting entities of type {typeof(TEntity).Name}",
                ex
            );
        }
    }
}

#pragma warning restore IDE0058
