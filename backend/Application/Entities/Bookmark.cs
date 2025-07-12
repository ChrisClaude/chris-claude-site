using System;

namespace Application.Entities;

public class Bookmark
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
