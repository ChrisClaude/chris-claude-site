using System;

namespace Application.Entities;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Image { get; set; }
}
