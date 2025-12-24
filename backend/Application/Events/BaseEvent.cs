using Application.Entities;

namespace Application.Events;

public class BaseEvent<TEntity>(TEntity entity) : IEvent
    where TEntity : BaseEntity
{
    public TEntity Entity { get; } = entity;

    public DateTime OccurredOn { get; }

    public Guid EventId { get; }
}
