using System;
using Application.Common.Dtos;
using Application.Entities;

namespace Application.Mappings;

public static class BookmarkMapper
{
    public static BookmarkDto MapToDto(this Bookmark bookmark)
    {
        ArgumentNullException.ThrowIfNull(bookmark);
        return new BookmarkDto { PostId = bookmark.PostId, UserId = bookmark.UserId };
    }
}
