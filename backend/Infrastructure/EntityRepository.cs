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

public partial class EntityRepository<TEntity> : IRepository<TEntity>
    where TEntity : BaseEntity
{
    #region Fields

    private readonly IEventPublisher _eventPublisher;
    private readonly ApplicationContext _context;
    private readonly ICacheManager _cacheManager;

    #endregion

    #region Ctor

    public EntityRepository(
        IEventPublisher eventPublisher,
        ApplicationContext context,
        ICacheManager cacheManager
    )
    {
        _eventPublisher = eventPublisher;
        _context = context;
        _cacheManager = cacheManager;
    }

    #endregion


    #region Methods

    public virtual async Task<TEntity> GetByIdAsync(
        Guid? id,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    )
    {
        if (!id.HasValue)
            throw new ArgumentNullException(nameof(id));

        async Task<TEntity> getEntityAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            {
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);
            }

            if (includes != null)
            {
                query = Include(query, includes);
            }

            var entity = await query.FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
                throw new NotFoundException($"Entity with ID {id} not found");

            return entity;
        }

        if (cacheKey == null)
            return await getEntityAsync();

        if (await _cacheManager.GetAsync(cacheKey, out TEntity entity))
            return entity;

        return await getEntityAsync();
    }

    public virtual async Task<IList<TEntity>> GetByIdsAsync(
        IList<Guid> ids,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    )
    {
        if (ids == null || !ids.Any())
            return new List<TEntity>();

        async Task<IList<TEntity>> getEntitiesAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            {
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);
            }
            return await query.Where(e => ids.Contains(e.Id)).ToListAsync();
        }

        if (cacheKey == null)
            return await getEntitiesAsync();

        if (await _cacheManager.GetAsync(cacheKey, out IList<TEntity> entities))
            return entities;

        return await getEntitiesAsync();
    }

    public virtual async Task<IList<TEntity>> GetAllAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    )
    {
        async Task<IList<TEntity>> getEntitiesAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            {
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);
            }

            query = func != null ? func(query) : query;

            if (includes != null)
            {
                query = Include(query, includes);
            }

            return await query.ToListAsync();
        }

        if (cacheKey == null)
            return await getEntitiesAsync();

        if (await _cacheManager.GetAsync(cacheKey, out IList<TEntity> entities))
            return entities;

        return await getEntitiesAsync();
    }

    public virtual async Task<IList<TResult>> GetAllWithSelectorAsync<TResult>(
        Expression<Func<TEntity, TResult>> selector,
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    )
    {
        async Task<IList<TResult>> getEntitiesAsync()
        {
            var query = Table;
            if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            {
                query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);
            }

            query = func != null ? func(query) : query;

            if (includes != null)
            {
                query = Include(query, includes);
            }

            return await query.Select(selector).ToListAsync();
        }

        if (cacheKey == null)
            return await getEntitiesAsync();

        if (await _cacheManager.GetAsync(cacheKey, out IList<TResult> entities))
            return entities;

        return await getEntitiesAsync();
    }

    public virtual async Task<IPagedList<TEntity>> GetAllPagedAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        int pageIndex = 0,
        int pageSize = int.MaxValue,
        bool getOnlyTotalCount = false,
        bool includeDeleted = true
    )
    {
        var query = Table;

        if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
        {
            query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);
        }

        query = func != null ? func(query) : query;

        if (includes != null)
        {
            query = Include(query, includes);
        }

        return await ToPagedListAsync(query, pageIndex, pageSize, getOnlyTotalCount);
    }

    public virtual async Task InsertAsync(TEntity entity, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entity);

        try
        {
            await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();

            if (publishEvent)
                await _eventPublisher.PublishAsync(new EntityInsertedEvent<TEntity>(entity));
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error inserting entity of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    public virtual async Task InsertAsync(IList<TEntity> entities, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entities);

        try
        {
            await _context.Set<TEntity>().AddRangeAsync(entities);
            await _context.SaveChangesAsync();

            if (publishEvent)
            {
                foreach (var entity in entities)
                {
                    await _eventPublisher.PublishAsync(new EntityInsertedEvent<TEntity>(entity));
                }
            }
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error inserting entities of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    public virtual async Task UpdateAsync(TEntity entity, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entity);

        try
        {
            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();

            if (publishEvent)
                await _eventPublisher.PublishAsync(new EntityUpdatedEvent<TEntity>(entity));
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error updating entity of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    public virtual async Task UpdateAsync(IList<TEntity> entities, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entities);

        try
        {
            _context.Set<TEntity>().UpdateRange(entities);
            await _context.SaveChangesAsync();

            if (publishEvent)
            {
                foreach (var entity in entities)
                {
                    await _eventPublisher.PublishAsync(new EntityUpdatedEvent<TEntity>(entity));
                }
            }
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error updating entities of type {typeof(TEntity).Name}",
                ex
            );
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
            var entity = await _context.Set<TEntity>().FindAsync(id);
            if (entity == null)
                throw new NotFoundException($"Entity with ID {id} not found");

            var entry = _context.Entry(entity);

            foreach (var kvp in propertyUpdates)
            {
                entry.Property(kvp.Key).CurrentValue = kvp.Value;
            }

            await _context.SaveChangesAsync();

            if (publishEvent)
                await _eventPublisher.PublishAsync(new EntityUpdatedEvent<TEntity>(entity));
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

        try
        {
            if (entity is ISoftDeletedEntity softDeletedEntity)
            {
                softDeletedEntity.IsDeleted = true;
                await UpdateAsync(entity, publishEvent);
            }
            else
            {
                _context.Set<TEntity>().Remove(entity);
                await _context.SaveChangesAsync();
            }

            if (publishEvent)
                await _eventPublisher.PublishAsync(new EntityDeletedEvent<TEntity>(entity));
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error deleting entity of type {typeof(TEntity).Name}",
                ex
            );
        }
    }

    public virtual async Task DeleteAsync(IList<TEntity> entities, bool publishEvent = true)
    {
        ArgumentNullException.ThrowIfNull(entities);

        try
        {
            if (typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            {
                foreach (var entity in entities)
                {
                    ((ISoftDeletedEntity)entity).IsDeleted = true;
                }
                await UpdateAsync(entities, publishEvent);
            }
            else
            {
                _context.Set<TEntity>().RemoveRange(entities);
                await _context.SaveChangesAsync();
            }

            if (publishEvent)
            {
                foreach (var entity in entities)
                {
                    await _eventPublisher.PublishAsync(new EntityDeletedEvent<TEntity>(entity));
                }
            }
        }
        catch (DbUpdateException ex)
        {
            throw new RepositoryException(
                $"Error deleting entities of type {typeof(TEntity).Name}",
                ex
            );
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

        // Get total count
        var totalCount = await query.CountAsync();

        // Return if only total count is requested
        if (getOnlyTotalCount)
            return new PagedList<TEntity>([], pageIndex, pageSize, totalCount);

        // Adjust page size
        if (pageSize <= 0)
            pageSize = int.MaxValue;

        // Adjust page index
        if (pageIndex <= 0)
            pageIndex = 0;

        // Add default ordering by Id if no ordering is specified
        // Entity Framework Core requires explicit ordering when using  Skip with split queries to ensure consistent results
        if (!query.Expression.ToString().Contains("OrderBy", StringComparison.OrdinalIgnoreCase))
        {
            query = query.OrderBy(e => e.Id);
        }

        // Get paginated data
        var items = await query.Skip(pageIndex * pageSize).Take(pageSize).ToListAsync();

        return new PagedList<TEntity>(items, pageIndex, pageSize, totalCount);
    }

    private static IQueryable<TEntity> Include(IQueryable<TEntity> query, string[] includes)
    {
        if (includes != null && includes.Length > 0)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            query = query.AsSplitQuery();
        }

        return query;
    }
    #endregion

    #region Properties

    /// <summary>
    /// Gets a table
    /// </summary>
    private IQueryable<TEntity> Table => _context.Set<TEntity>();

    #endregion
}

#pragma warning restore IDE0058
