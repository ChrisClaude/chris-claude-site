using Application.Caching;
using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Users;

public class UpdateUserRolesCommand : IRequest<Result<UserDto>>
{
    public Guid UserId { get; set; }
    public IEnumerable<string> Roles { get; set; } = [];
}

public class UpdateUserRolesCommandValidator : AbstractValidator<UpdateUserRolesCommand>
{
    private static readonly string[] _validRoles =
    [
        RoleName.ADMIN,
        RoleName.PUBLISHER,
        RoleName.READER,
    ];

    public UpdateUserRolesCommandValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.Roles)
            .NotNull()
            .Must(roles => roles.Any())
            .WithMessage("At least one role is required.")
            .Must(roles => roles.All(r => _validRoles.Contains(r)))
            .WithMessage($"Roles must be one of: {string.Join(", ", _validRoles)}.");
    }
}

public class UpdateUserRolesCommandHandler(
    IRepository<User> userRepository,
    IRepository<Role> roleRepository,
    IBridgeRepository<UserRole> userRoleRepository
) : IRequestHandler<UpdateUserRolesCommand, Result<UserDto>>
{
    public async Task<Result<UserDto>> Handle(
        UpdateUserRolesCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);
        var roleNameList = request.Roles.ToList();

        var user = await userRepository.GetByIdAsync(
            request.UserId,
            new string[]
            {
                nameof(User.UserRoles),
                $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}",
            }
        );

        if (user is null)
        {
            return Result.Failure<UserDto>(
                AppError.NotFound("User not found."),
                ErrorType.NotFound
            );
        }

        var targetRoles = await roleRepository.GetAllAsync(
            query => query.Where(r => roleNameList.Contains(r.Name)),
            cacheKey: new CacheKey($"roles_{string.Join("_", roleNameList)}", 60)
        );

        await userRoleRepository.DeleteAsync(user.UserRoles.ToList());

        var newUserRoles = targetRoles
            .Select(r => new UserRole
            {
                UserId = user.Id,
                RoleId = r.Id,
                Role = r,
            })
            .ToList();

        await userRoleRepository.InsertAsync(newUserRoles);

        user.UserRoles = newUserRoles;

        return Result.Success(user.MapToDto());
    }
}
