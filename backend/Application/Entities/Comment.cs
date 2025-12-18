using System;
using Application.Enums;

namespace Application.Entities;

public class Comment : BaseEntity, IAuditable, ISoftDeletedEntity
{
    public string Content { get; set; }
    public Guid PostId { get; set; }
    public Post Post { get; set; }
    public Guid AuthorId { get; set; }
    public User Author { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    public User CreatedByUser { get; set; }
    public User UpdatedByUser { get; set; }
    public bool IsDeleted { get; set; }
    public AuditActionType AuditAction { get; set; }
    public string PreviousState { get; set; }
    public string NewState { get; set; }
}
