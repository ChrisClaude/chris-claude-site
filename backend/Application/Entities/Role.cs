namespace Application.Entities;

public class Role : BaseEntity
{
    public required string Name { get; set; }
    public IEnumerable<UserRole>? UserRoles { get; set; }
}
