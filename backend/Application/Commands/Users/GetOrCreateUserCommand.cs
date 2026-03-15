using System;
using Application.Common;
using Application.Common.Dtos;
using MediatR;

namespace Application.Commands.Users;

public class GetOrCreateUserCommand : IRequest<Result<UserDto>>
{
    public string Email { get; set; }

    public GetOrCreateUserCommand(string email)
    {
        Email = email;
    }
}
