using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Users;

public class UpdateUserCommand : IRequest<Result<UserDto>>
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string? Image { get; set; }
}

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Surname).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Image).MaximumLength(2048).When(x => x.Image != null);
    }
}

public class UpdateUserCommandHandler(IRepository<User> userRepository)
    : IRequestHandler<UpdateUserCommand, Result<UserDto>>
{
    public async Task<Result<UserDto>> Handle(
        UpdateUserCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);

        var user = await userRepository.GetByIdAsync(
            request.UserId,
            new[] { nameof(User.UserRoles), $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}" }
        );

        if (user == null)
        {
            return Result.Failure<UserDto>(
                AppError.NotFound("User not found."),
                ErrorType.NotFound
            );
        }

        user.Name = request.Name;
        user.Surname = request.Surname;
        user.Image = request.Image;

        await userRepository.UpdateAsync(user);

        return Result.Success(user.MapToDto());
    }
}
