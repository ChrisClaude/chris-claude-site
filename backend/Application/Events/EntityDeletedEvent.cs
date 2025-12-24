using Application.Entities;

namespace Application.Events;

public class EntityDeletedEvent<TEntity> : BaseEvent<TEntity>
    where TEntity : BaseEntity
{
    public EntityDeletedEvent(TEntity entity)
        : base(entity) { }
}
