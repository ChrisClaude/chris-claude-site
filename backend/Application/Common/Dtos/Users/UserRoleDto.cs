namespace Application.Common.Dtos;

public class UserRoleDto
{
    public required Guid RoleId { get; set; }
    public required RoleDto Role { get; set; }
}
