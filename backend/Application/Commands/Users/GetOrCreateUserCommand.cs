using System;
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

public class GetOrCreateUserCommandHandler(IRepository<User> userRepository)
    : IRequestHandler<GetOrCreateUserCommand, Result<UserDto>>
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

        var newUser = new User
        {
            Email = request.Email,
            Name = request.Email.Split("@")[0],
            Surname = request.Email.Split("@")[0],
            Bookmarks = new List<Bookmark>(),
            Comments = new List<Comment>(),
            PostReactions = new List<PostReaction>(),
            Posts = new List<Post>(),
            UserRoles = new List<UserRole>()
            {
                new() { Role = new Role { Name = RoleName.READER } },
            },
            Image = "",
        };

        await userRepository.InsertAsync(newUser);

        return Result.Success(newUser.MapToDto());
    }
}
