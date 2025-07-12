using Application.Enums;

namespace Application.Entities;

public class Post : BaseEntity, IAuditable, ISoftDeletedEntity
{
    public string Title { get; set; }
    public string Content { get; set; }
    public string Thumbnail { get; set; }
    public PostStatus Status { get; set; }
    public string Excerpt { get; set; }
    public Guid AuthorId { get; set; }
    public User Author { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public User CreatedByUser { get; set; }
    public User UpdatedByUser { get; set; }
    public bool IsDeleted { get; set; }
}
