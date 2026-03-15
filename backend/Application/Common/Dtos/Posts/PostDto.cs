using Application.Enums;

namespace Application.Common.Dtos;

public class PostDto
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Excerpt { get; set; }
    public required string Thumbnail { get; set; }
    public required string Slug { get; set; }
    public PostStatus Status { get; set; }
    public Guid AuthorId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}
