using System;
using Application.Entities;

namespace Application.Events;

public class EntityInsertedEvent<TEntity> : IEvent
    where TEntity : BaseEntity
{
    public TEntity Entity { get; }

    public EntityInsertedEvent(TEntity entity)
    {
        Entity = entity;
    }
}
