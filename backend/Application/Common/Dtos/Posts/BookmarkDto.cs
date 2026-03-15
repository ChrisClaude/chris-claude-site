namespace Application.Common.Dtos;

public class BookmarkDto
{
    public required Guid PostId { get; set; }
    public required PostDto Post { get; set; }
}
