namespace Application.Entities;

public class User : BaseEntity
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public string? Image { get; set; }
    public required IEnumerable<UserRole> UserRoles { get; set; }
    public IEnumerable<Bookmark>? Bookmarks { get; set; }
    public IEnumerable<PostReaction>? PostReactions { get; set; }
    public IEnumerable<Comment>? Comments { get; set; }
    public IEnumerable<Post>? Posts { get; set; }
}
