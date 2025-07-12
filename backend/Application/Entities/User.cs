using System;

namespace Application.Entities;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Image { get; set; }
    public IEnumerable<UserRole> UserRoles { get; set; }
    public IEnumerable<Bookmark> Bookmarks { get; set; }
    public IEnumerable<PostReaction> PostReactions { get; set; }
    public IEnumerable<Comment> Comments { get; set; }
    public IEnumerable<Post> Posts { get; set; }
}
