using System.Linq.Expressions;
using Application.Caching;
using Application.Entities;

namespace Application.Interfaces;

public interface IRepository<TEntity>
    where TEntity : BaseEntity
{
    #region Methods

    Task<TEntity> GetByIdAsync(
        Guid? id,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    );

    Task<IList<TEntity>> GetByIdsAsync(
        IList<Guid> ids,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    );

    Task<IList<TEntity>> GetAllAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    );

    Task<IList<TResult>> GetAllWithSelectorAsync<TResult>(
        Expression<Func<TEntity, TResult>> selector,
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = true
    );

    Task<IPagedList<TEntity>> GetAllPagedAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        int pageIndex = 0,
        int pageSize = int.MaxValue,
        bool getOnlyTotalCount = false,
        bool includeDeleted = true
    );

    Task InsertAsync(TEntity entity, bool publishEvent = true);

    Task InsertAsync(IList<TEntity> entities, bool publishEvent = true);

    Task UpdateAsync(TEntity entity, bool publishEvent = true);

    Task UpdateAsync(IList<TEntity> entities, bool publishEvent = true);

    Task UpdateSpecificPropertiesAsync(
        Guid id,
        Dictionary<Expression<Func<TEntity, object>>, object> propertyUpdates,
        bool publishEvent = true
    );

    Task DeleteAsync(TEntity entity, bool publishEvent = true);

    Task DeleteAsync(IList<TEntity> entities, bool publishEvent = true);

    #endregion
}
