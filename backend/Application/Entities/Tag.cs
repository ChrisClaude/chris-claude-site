using System;
using Application.Enums;

namespace Application.Entities;

public class Tag : BaseEntity, IAuditable
{
    public string Name { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public User CreatedByUser { get; set; }
    public User UpdatedByUser { get; set; }
    public IEnumerable<PostTag> PostTags { get; set; }
    public AuditActionType AuditAction { get; set; }
    public string PreviousState { get; set; }
    public string NewState { get; set; }
}
