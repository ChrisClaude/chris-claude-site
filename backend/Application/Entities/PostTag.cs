namespace Application.Entities;

public class PostTag
{
    public Guid PostId { get; set; }
    public Guid TagId { get; set; }
    public required Post Post { get; set; }
    public required Tag Tag { get; set; }
}
