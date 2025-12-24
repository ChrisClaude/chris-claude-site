using Application.Enums;

namespace Application.Entities;

public class NewsletterSignUp : BaseEntity, IAuditable
{
    public required string Email { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public Guid CreatedBy { get; set; }

    // We want to keep the timestamp for inactive users
    // who should be removed after they have been active for some time
    public Guid? UpdatedBy { get; set; }
    public required User CreatedByUser { get; set; } // This will be the system user
    public required User UpdatedByUser { get; set; }
    public required IEnumerable<ProcessedNotification> ProcessedNotifications { get; set; }
    public AuditActionType AuditAction { get; set; }
    public required string PreviousState { get; set; }
    public required string NewState { get; set; }
}
