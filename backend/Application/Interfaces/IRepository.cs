using System.Linq.Expressions;
using Application.Caching;
using Application.Entities;

namespace Application.Interfaces;

public interface IRepository<TEntity>
    where TEntity : BaseEntity
{
    #region Methods

    public Task<TEntity> GetByIdAsync(
        Guid? id,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    );

    public Task<IList<TEntity>> GetByIdsAsync(
        IList<Guid> ids,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    );

    public Task<IList<TEntity>> GetAllAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    );

    public Task<IList<TResult>> GetAllWithSelectorAsync<TResult>(
        Expression<Func<TEntity, TResult>> selector,
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        CacheKey? cacheKey = null,
        bool includeDeleted = false
    );

    public Task<IPagedList<TEntity>> GetAllPagedAsync(
        Func<IQueryable<TEntity>, IQueryable<TEntity>>? func = null,
        string[]? includes = null,
        int pageIndex = 0,
        int pageSize = int.MaxValue,
        bool getOnlyTotalCount = false,
        bool includeDeleted = false
    );

    public Task InsertAsync(TEntity entity, bool publishEvent = true);

    public Task InsertAsync(IList<TEntity> entities, bool publishEvent = true);

    public Task UpdateAsync(TEntity entity, bool publishEvent = true);

    public Task UpdateAsync(IList<TEntity> entities, bool publishEvent = true);

    public Task UpdateSpecificPropertiesAsync(
        Guid id,
        Dictionary<Expression<Func<TEntity, object>>, object> propertyUpdates,
        bool publishEvent = true
    );

    public Task DeleteAsync(TEntity entity, bool publishEvent = true);

    public Task DeleteAsync(IList<TEntity> entities, bool publishEvent = true);

    #endregion
}
