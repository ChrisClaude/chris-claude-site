namespace Application.Common.Dtos;

public class BookmarkDto
{
    public required Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public PostDto? Post { get; set; }
}
