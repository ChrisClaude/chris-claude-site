using System;

namespace Application.Entities;

public interface IAuditable
{
    DateTimeOffset CreatedAt { get; set; }
    DateTimeOffset? UpdatedAt { get; set; }

    Guid CreatedBy { get; set; }
    Guid? UpdatedBy { get; set; }

    User CreatedByUser { get; set; }
    User UpdatedByUser { get; set; }
}
