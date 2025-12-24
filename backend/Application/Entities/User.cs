namespace Application.Entities;

public class User : BaseEntity
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string Image { get; set; }
    public required IEnumerable<UserRole> UserRoles { get; set; }
    public required IEnumerable<Bookmark> Bookmarks { get; set; }
    public required IEnumerable<PostReaction> PostReactions { get; set; }
    public required IEnumerable<Comment> Comments { get; set; }
    public required IEnumerable<Post> Posts { get; set; }
}
