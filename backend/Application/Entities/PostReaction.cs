using System;

namespace Application.Entities;

public class PostReaction
{
    public Guid UserId { get; set; }
    public Guid PostId { get; set; }
    public Post Post { get; set; }
    public User User { get; set; }
}
