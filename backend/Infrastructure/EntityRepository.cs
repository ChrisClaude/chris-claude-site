using System.Linq.Expressions;
using Application.Caching;
using Application.Common.Dtos;
using Application.Entities;
using Application.Events;
using Application.Exceptions;
using Application.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Infrastructure;

#pragma warning disable IDE0058

public partial class EntityRepository<TEntity>(
    IEventPublisher eventPublisher,
    ApplicationDbContext context,
    ICacheManager cacheManager
) : BaseEntityRepository<TEntity>(context), IRepository<TEntity>
    where TEntity : BaseEntity
{
    #region Methods

    public virtual async Task<TEntity> GetByIdAsync(
        Guid? id,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    )
    {
        if (!id.HasValue)
            throw new ArgumentNullException(nameof(id));

        async Task<TEntity> getEntityAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);

            query = ApplyIncludes(query, includes);

            var entity = await query.FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
                throw new NotFoundException($"Entity with ID {id} not found");

            return entity;
        }

        if (cacheKey == null)
            return await getEntityAsync();

        if (await cacheManager.GetAsync(cacheKey, out TEntity entity))
            return entity;

        var result = await getEntityAsync();
        await cacheManager.AddAsync(cacheKey, result);
        return result;
    }

    public virtual async Task<IList<TEntity>> GetByIdsAsync(
        IList<Guid> ids,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    )
    {
        if (ids == null || !ids.Any())
            return new List<TEntity>();

        async Task<IList<TEntity>> getEntitiesAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);

            return await query.Where(e => ids.Contains(e.Id)).ToListAsync();
        }

        if (cacheKey == null)
            return await getEntitiesAsync();

        if (await cacheManager.GetAsync(cacheKey, out IList<TEntity> entities))
            return entities;

        var result = await getEntitiesAsync();
        await cacheManager.AddAsync(cacheKey, result);
        return result;
    }

    public virtual async Task<IList<TEntity>> GetAllAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    )
    {
        async Task<IList<TEntity>> getEntitiesAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);

            query = func != null ? func(query) : query;
            query = ApplyIncludes(query, includes);

            return await query.ToListAsync();
        }

        if (cacheKey == null)
            return await getEntitiesAsync();

        if (await cacheManager.GetAsync(cacheKey, out IList<TEntity> entities))
            return entities;

        var result = await getEntitiesAsync();
        await cacheManager.AddAsync(cacheKey, result);
        return result;
    }

    public virtual async Task<IList<TResult>> GetAllWithSelectorAsync<TResult>(
        Expression<Func<TEntity, TResult>> selector,
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    )
    {
        async Task<IList<TResult>> getEntitiesAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);

            query = func != null ? func(query) : query;
            query = ApplyIncludes(query, includes);

            return await query.Select(selector).ToListAsync();
        }

        if (cacheKey == null)
            return await getEntitiesAsync();

        if (await cacheManager.GetAsync(cacheKey, out IList<TResult> entities))
            return entities;

        var result = await getEntitiesAsync();
        await cacheManager.AddAsync(cacheKey, result);
        return result;
    }

    public virtual async Task<IPagedList<TEntity>> GetAllPagedAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        int pageIndex = 0,
        int pageSize = int.MaxValue,
        bool getOnlyTotalCount = false,
        bool includeDeleted = false
    )
    {
        var query = Table;

        if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);

        query = func != null ? func(query) : query;
        query = ApplyIncludes(query, includes);

        return await ToPagedListAsync(query, pageIndex, pageSize, getOnlyTotalCount);
    }

    public virtual async Task InsertAsync(TEntity entity, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entity);

        await CoreInsertAsync(entity);

        if (publishEvent)
            await eventPublisher.PublishAsync(new EntityInsertedEvent<TEntity>(entity));
    }

    public virtual async Task InsertAsync(IList<TEntity> entities, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entities);

        await CoreInsertAsync(entities);

        if (publishEvent)
        {
            foreach (var entity in entities)
                await eventPublisher.PublishAsync(new EntityInsertedEvent<TEntity>(entity));
        }
    }

    public virtual async Task UpdateAsync(TEntity entity, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entity);

        await CoreUpdateAsync(entity);

        if (publishEvent)
            await eventPublisher.PublishAsync(new EntityUpdatedEvent<TEntity>(entity));
    }

    public virtual async Task UpdateAsync(IList<TEntity> entities, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entities);

        await CoreUpdateAsync(entities);

        if (publishEvent)
        {
            foreach (var entity in entities)
                await eventPublisher.PublishAsync(new EntityUpdatedEvent<TEntity>(entity));
        }
    }

    public virtual async Task UpdateSpecificPropertiesAsync(
        Guid id,
        Dictionary<Expression<Func<TEntity, object>>, object> propertyUpdates,
        bool publishEvent = true
    )
    {
        ArgumentNullException.ThrowIfNull(propertyUpdates);
        try
        {
            var entity =
                await Context.Set<TEntity>().FindAsync(id)
                ?? throw new NotFoundException($"Entity with ID {id} not found");

            var entry = Context.Entry(entity);

            foreach (var kvp in propertyUpdates)
                entry.Property(kvp.Key).CurrentValue = kvp.Value;

            await Context.SaveChangesAsync();

            if (publishEvent)
                await eventPublisher.PublishAsync(new EntityUpdatedEvent<TEntity>(entity));
        }
        catch (DbUpdateException ex)
        {
            Log.Error(
                ex,
                "Error updating properties of entity type {EntityType}",
                typeof(TEntity).Name
            );
            throw new RepositoryException(
                $"Error updating properties of entity type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    public virtual async Task DeleteAsync(TEntity entity, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entity);

        if (entity is ISoftDeletedEntity softDeletedEntity)
        {
            softDeletedEntity.IsDeleted = true;
            await UpdateAsync(entity, publishEvent);
        }
        else
        {
            await CoreDeleteAsync(entity);
        }

        if (publishEvent)
            await eventPublisher.PublishAsync(new EntityDeletedEvent<TEntity>(entity));
    }

    public virtual async Task DeleteAsync(IList<TEntity> entities, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entities);

        if (typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
        {
            foreach (var entity in entities)
                ((ISoftDeletedEntity)entity).IsDeleted = true;

            await UpdateAsync(entities, publishEvent);
        }
        else
        {
            await CoreDeleteAsync(entities);
        }

        if (publishEvent)
        {
            foreach (var entity in entities)
                await eventPublisher.PublishAsync(new EntityDeletedEvent<TEntity>(entity));
        }
    }

    #endregion

    #region Utility methods

    protected virtual async Task<IPagedList<TEntity>> ToPagedListAsync(
        IQueryable<TEntity> query,
        int pageIndex,
        int pageSize,
        bool getOnlyTotalCount
    )
    {
        ArgumentNullException.ThrowIfNull(query);

        var totalCount = await query.CountAsync();

        if (getOnlyTotalCount)
            return new PagedList<TEntity>([], pageIndex, pageSize, totalCount);

        if (pageSize <= 0)
            pageSize = int.MaxValue;

        if (pageIndex <= 0)
            pageIndex = 0;

        // Entity Framework Core requires explicit ordering when using Skip with split queries to ensure consistent results
        if (!query.Expression.ToString().Contains("OrderBy", StringComparison.OrdinalIgnoreCase))
            query = query.OrderBy(e => e.Id);

        var items = await query.Skip(pageIndex * pageSize).Take(pageSize).ToListAsync();

        return new PagedList<TEntity>(items, pageIndex, pageSize, totalCount);
    }

    #endregion
}

#pragma warning restore IDE0058
