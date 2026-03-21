namespace Application.Common.Dtos;

public class UserDto
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string Image { get; set; }
    public required IEnumerable<UserRoleDto> UserRoles { get; set; }
    public IEnumerable<BookmarkDto>? Bookmarks { get; set; }
    public IEnumerable<PostReactionDto>? PostReactions { get; set; }
    public IEnumerable<CommentDto>? Comments { get; set; }
    public IEnumerable<PostDto>? Posts { get; set; }
}
