using System;

namespace Application.Entities;

public interface ISoftDeletedEntity
{
    public bool IsDeleted { get; set; }
}
