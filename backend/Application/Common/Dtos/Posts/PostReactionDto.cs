namespace Application.Common.Dtos;

public class PostReactionDto
{
    public required Guid PostId { get; set; }
    public required PostDto Post { get; set; }
}
