using Application.Entities;

namespace Application.Events;

public class EntityUpdatedEvent<TEntity> : BaseEvent<TEntity>
    where TEntity : BaseEntity
{
    public EntityUpdatedEvent(TEntity entity)
        : base(entity) { }
}
