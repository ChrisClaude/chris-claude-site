using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;

namespace Application.Mappings;

public static class PostMapper
{
    public static PostDto MapToDto(this Post post)
    {
        ArgumentNullException.ThrowIfNull(post);
        return new PostDto
        {
            Id = post.Id,
            Title = post.Title,
            Content = post.Content,
            Thumbnail = post.Thumbnail,
            Status = post.Status,
            PublishedAt = post.PublishedAt,
            Excerpt = post.Excerpt,
            Slug = post.Slug,
            AuthorId = post.AuthorId,
            CreatedAt = post.CreatedAt,
            UpdatedAt = post.UpdatedAt,
            Author = post.Author.MapToDto(),
            PostTags = post.PostTags.Select(x => x.MapToDto()).ToList(),
        };
    }

    public static PagedListDto<PostDto> MapToDto(this IPagedList<Post> posts)
    {
        ArgumentNullException.ThrowIfNull(posts);
        return new PagedListDto<PostDto>
        {
            PageIndex = posts.PageIndex,
            PageSize = posts.PageSize,
            TotalCount = posts.TotalCount,
            TotalPages = posts.TotalPages,
            HasPreviousPage = posts.HasPreviousPage,
            HasNextPage = posts.HasNextPage,
            Items = posts.Select(x => x.MapToDto()).ToList(),
        };
    }
}

public static class PostTagMapper
{
    public static PostTagDto MapToDto(this PostTag postTag)
    {
        ArgumentNullException.ThrowIfNull(postTag);
        return new PostTagDto
        {
            PostId = postTag.PostId,
            TagId = postTag.TagId,
            Tag = postTag.Tag.MapToDto(),
        };
    }
}

public static class TagMapper
{
    public static TagDto MapToDto(this Tag tag)
    {
        ArgumentNullException.ThrowIfNull(tag);
        return new TagDto { Id = tag.Id, Name = tag.Name };
    }
}
