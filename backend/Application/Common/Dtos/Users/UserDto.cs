namespace Application.Common.Dtos;

public class UserDto
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string Image { get; set; }
    public required IEnumerable<UserRoleDto> UserRoles { get; set; }
    public required IEnumerable<BookmarkDto> Bookmarks { get; set; }
    public required IEnumerable<PostReactionDto> PostReactions { get; set; }
    public required IEnumerable<CommentDto> Comments { get; set; }
    public required IEnumerable<PostDto> Posts { get; set; }
}
