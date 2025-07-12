using System;

namespace Application.Entities;

public class Role : BaseEntity
{
    public string Name { get; set; }
    public IEnumerable<UserRole> UserRoles { get; set; }
}
