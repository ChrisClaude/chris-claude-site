using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;
using Application.Interfaces.Queries;
using Application.Mappings;

namespace Application.Queries;

public class UserQueries(IRepository<User> repository) : IUserQueries
{
    public async Task<Result<UserDto>> GetUserAsync(Guid id)
    {
        var user = await repository.GetByIdAsync(
            id,
            new string[]
            {
                nameof(User.UserRoles),
                $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}",
            }
        );
        if (user == null)
        {
            return Result.Failure<UserDto>(AppError.NotFound("User not found"), ErrorType.NotFound);
        }

        return Result.Success(user.MapToDto());
    }

    public async Task<Result<PagedListDto<UserDto>>> GetUsersAsync(int page, int pageSize)
    {
        var users = await repository.GetAllPagedAsync(
            queryable => queryable.OrderBy(x => x.Email),
            includes: new[]
            {
                nameof(User.UserRoles),
                $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}",
            },
            pageIndex: page,
            pageSize: pageSize
        );

        return Result.Success(users.MapToDto());
    }
}
