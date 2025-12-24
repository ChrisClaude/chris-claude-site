using Application.Enums;

namespace Application.Entities;

public class Post : BaseEntity, IAuditable, ISoftDeletedEntity
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string Thumbnail { get; set; }
    public PostStatus Status { get; set; }
    public required string Excerpt { get; set; }
    public required string Slug { get; set; }
    public Guid AuthorId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public bool IsDeleted { get; set; }

    public required User CreatedByUser { get; set; }
    public required User UpdatedByUser { get; set; }
    public required User Author { get; set; }
    public required IEnumerable<PostTag> PostTags { get; set; }
    public required IEnumerable<Comment> Comments { get; set; }
    public required IEnumerable<PostReaction> PostReactions { get; set; }
    public required IEnumerable<Bookmark> Bookmarks { get; set; }
    public required IEnumerable<Tag> Tags { get; set; }
    public required IEnumerable<ProcessedNotification> ProcessedNotifications { get; set; }
    public AuditActionType AuditAction { get; set; }
    public required string PreviousState { get; set; }
    public required string NewState { get; set; }
}
