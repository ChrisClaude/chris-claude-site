using Application.Enums;

namespace Application.Entities;

public class Tag : BaseEntity, IAuditable
{
    public required string Name { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public required User CreatedByUser { get; set; }
    public required User UpdatedByUser { get; set; }
    public required IEnumerable<PostTag> PostTags { get; set; }
    public AuditActionType AuditAction { get; set; }
    public required string PreviousState { get; set; }
    public required string NewState { get; set; }
}
