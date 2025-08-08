using System;
using Application.Entities;

namespace Application.Events;

public class EntityUpdatedEvent<TEntity> : IEvent
    where TEntity : BaseEntity
{
    public TEntity Entity { get; }

    public EntityUpdatedEvent(TEntity entity)
    {
        Entity = entity;
    }
}
