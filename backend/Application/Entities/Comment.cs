using Application.Enums;

namespace Application.Entities;

public class Comment : BaseEntity, IAuditable, ISoftDeletedEntity
{
    public required string Content { get; set; }
    public Guid PostId { get; set; }
    public required Post Post { get; set; }
    public Guid AuthorId { get; set; }
    public required User Author { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public required User CreatedByUser { get; set; }
    public required User UpdatedByUser { get; set; }
    public bool IsDeleted { get; set; }
    public AuditActionType AuditAction { get; set; }
    public required string PreviousState { get; set; }
    public required string NewState { get; set; }
}
