using System;

namespace Application.Entities;

// Note: We might not want to store this table in a relational database
// as it can grow very large and have require multiple reads and writes.
public class PostView : BaseEntity
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public DateTimeOffset ViewedAt { get; set; }
    public string UserAgent { get; set; }
    public string IpAddress { get; set; }
    public Post Post { get; set; }
    public User User { get; set; }
}
