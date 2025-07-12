using System;

namespace Application.Entities;

public class Bookmark
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public Post Post { get; set; }
    public User User { get; set; }
}
