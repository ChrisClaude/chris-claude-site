using Application.Common.Dtos;
using MediatR;

namespace Application.Common;

public abstract class AuthenticatedRequest<T> : IRequest<T>
{
    public required UserDto UserDto { get; set; }
}
