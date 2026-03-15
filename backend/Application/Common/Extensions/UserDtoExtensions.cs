using Application.Common.Dtos;
using Application.Enums;

namespace Application.Common.Extensions;

public static class UserDtoExtensions
{
    public static bool IsAdmin(this UserDto user)
    {
        ArgumentNullException.ThrowIfNull(user);
        return user.UserRoles.Any(x => x.Role.Name == RoleName.ADMIN);
    }

    public static bool IsPublisher(this UserDto user)
    {
        ArgumentNullException.ThrowIfNull(user);
        return user.UserRoles.Any(x => x.Role.Name == RoleName.PUBLISHER);
    }

    public static bool IsReader(this UserDto user)
    {
        ArgumentNullException.ThrowIfNull(user);
        return user.UserRoles.Any(x => x.Role.Name == RoleName.READER);
    }
}
