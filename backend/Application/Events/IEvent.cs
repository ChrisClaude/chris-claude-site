using MediatR;

namespace Application.Events;

public interface IEvent : INotification
{
    public DateTime OccurredOn { get; }
    public Guid EventId { get; }
}
