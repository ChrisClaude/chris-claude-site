using Application.Entities;

namespace Application.Events;

public class EntityInsertedEvent<TEntity> : BaseEvent<TEntity>
    where TEntity : BaseEntity
{
    public EntityInsertedEvent(TEntity entity)
        : base(entity) { }
}
