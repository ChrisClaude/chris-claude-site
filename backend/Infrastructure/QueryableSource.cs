using Application.Entities;
using Application.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class QueryableSource<TEntity>(ApplicationDbContext context) : IQueryableSource<TEntity>
    where TEntity : BaseEntity
{
    public IQueryable<TEntity> Query(bool includeDeleted = false)
    {
        var query = context.Set<TEntity>().AsQueryable();

        if (includeDeleted)
            query = query.IgnoreQueryFilters();

        return query;
    }
}
