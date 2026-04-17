using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
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

public class GetOrCreateUserCommandValidator : AbstractValidator<GetOrCreateUserCommand>
{
    public GetOrCreateUserCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Email).EmailAddress();
    }
}

public class GetOrCreateUserCommandHandler(
    IRepository<User> userRepository,
    IRepository<Role> roleRepository
) : IRequestHandler<GetOrCreateUserCommand, Result<UserDto>>
{
    public async Task<Result<UserDto>> Handle(
        GetOrCreateUserCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);
        var users = await userRepository.GetAllAsync(
            query => query.Where(x => x.Email == request.Email),
            [nameof(User.UserRoles), $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}"]
        );

        var user = users.FirstOrDefault();

        if (user != null)
        {
            return Result.Success(user.MapToDto());
        }

        var readerRole = await roleRepository.GetByIdAsync(RoleIds.READER);

        var newUser = new User
        {
            Email = request.Email,
            Name = request.Email.Split("@")[0],
            Surname = request.Email.Split("@")[0],
            UserRoles = [new() { RoleId = readerRole.Id, Role = readerRole }],
        };

        await userRepository.InsertAsync(newUser);

        return Result.Success(newUser.MapToDto());
    }
}
