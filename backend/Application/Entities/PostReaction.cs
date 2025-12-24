namespace Application.Entities;

public class PostReaction
{
    public Guid UserId { get; set; }
    public Guid PostId { get; set; }
    public required Post Post { get; set; }
    public required User User { get; set; }
}
