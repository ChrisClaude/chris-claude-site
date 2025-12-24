namespace Application.Entities;

public class Role : BaseEntity
{
    public required string Name { get; set; }
    public required IEnumerable<UserRole> UserRoles { get; set; }
}
