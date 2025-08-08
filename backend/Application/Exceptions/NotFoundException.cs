using System;

namespace Application.Exceptions;

[Serializable]
public class NotFoundException : Exception
{
    public NotFoundException(string message)
        : base(message) { }
}
