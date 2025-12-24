namespace Application.Events;

public interface IEvent
{
    public DateTime OccurredOn { get; }
    public Guid EventId { get; }
}
