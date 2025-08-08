using System;

namespace Application.Events;

public interface IEventPublisher
{
    /// <summary>
    /// Publish event to consumers
    /// </summary>
    /// <typeparam name="TEvent">Type of event</typeparam>
    /// <param name="event">Event object</param>
    /// <returns>A task that represents the asynchronous operation</returns>
    Task PublishAsync<TEvent>(TEvent @event);
}
