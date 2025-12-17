using System;
using Application.Enums;

namespace Application.Entities;

public class NewsletterSignUp : BaseEntity, IAuditable
{
    public string Email { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }

    // We want to keep the timestamp for inactive users
    // who should be removed after they have been active for some time
    public Guid? UpdatedBy { get; set; }
    public User CreatedByUser { get; set; } // This will be the system user
    public User UpdatedByUser { get; set; }
    public IEnumerable<ProcessedNotification> ProcessedNotifications { get; set; }
    public AuditActionType AuditAction { get; set; }
    public string PreviousState { get; set; }
    public string NewState { get; set; }
}
