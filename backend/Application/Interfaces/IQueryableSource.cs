using Application.Entities;

namespace Application.Interfaces;

public interface IQueryableSource<out TEntity>
    where TEntity : BaseEntity
{
    public IQueryable<TEntity> Query(bool includeDeleted = false);
}
