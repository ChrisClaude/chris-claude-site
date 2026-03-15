using System;

namespace Application.Common.Dtos;

public class UserDto
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string Image { get; set; }
}
