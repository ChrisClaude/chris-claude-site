namespace Application.Common.Dtos;

public class CommentDto
{
    public required Guid Id { get; set; }
    public required string Content { get; set; }
    public Guid PostId { get; set; }
    public Guid AuthorId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}
