using Application.Enums;

namespace Application.Common.Dtos;

public class PostDto
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Thumbnail { get; set; }
    public required string Content { get; set; }
    public PostStatus Status { get; set; }
    public DateTimeOffset? PublishedAt { get; set; }
    public required string Excerpt { get; set; }
    public required string Slug { get; set; }
    public Guid AuthorId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public required UserDto Author { get; set; }
    public required IEnumerable<PostTagDto> PostTags { get; set; }
}

public class PostTagDto
{
    public Guid PostId { get; set; }
    public Guid TagId { get; set; }
    public required TagDto Tag { get; set; }
}

public class TagDto
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
}
