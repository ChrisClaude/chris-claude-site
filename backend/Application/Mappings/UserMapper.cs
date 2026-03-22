using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;

namespace Application.Mappings;

public static class UserMapper
{
    public static UserDto MapToDto(this User user)
    {
        ArgumentNullException.ThrowIfNull(user);
        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            Image = user.Image,
            UserRoles = user.UserRoles.Select(x => x.MapToDto()).ToList(),
            Bookmarks = user.Bookmarks?.Select(x => x.MapToDto()).ToList(),
        };
    }

    public static RoleDto MapToDto(this Role role)
    {
        ArgumentNullException.ThrowIfNull(role);
        return new RoleDto { Name = role.Name };
    }

    public static UserRoleDto MapToDto(this UserRole userRole)
    {
        ArgumentNullException.ThrowIfNull(userRole);
        return new UserRoleDto { Role = userRole.Role.MapToDto() };
    }

    public static PagedListDto<UserDto> MapToDto(this IPagedList<User> users)
    {
        ArgumentNullException.ThrowIfNull(users);
        return new PagedListDto<UserDto>
        {
            PageIndex = users.PageIndex,
            PageSize = users.PageSize,
            TotalCount = users.TotalCount,
            TotalPages = users.TotalPages,
            HasPreviousPage = users.HasPreviousPage,
            HasNextPage = users.HasNextPage,
            Items = users.Select(x => x.MapToDto()).ToList(),
        };
    }
}
