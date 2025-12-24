namespace Application.Entities;

public class ProcessedNotification
{
    public Guid PostId { get; set; }
    public Guid NewsletterSignUpId { get; set; }
    public DateTimeOffset ProcessedAt { get; set; }
    public bool IsSent { get; set; }
    public required Post Post { get; set; }
    public required NewsletterSignUp NewsletterSignUp { get; set; }
}
