using Application.Events;
using MediatR;

namespace Infrastructure;

public class EventPublisher(IPublisher publisher) : IEventPublisher
{
    public Task PublishAsync<TEvent>(TEvent appEvent)
        where TEvent : IEvent => publisher.Publish(appEvent);
}
