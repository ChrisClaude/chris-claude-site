using System;
using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using Application.Interfaces.Queries;
using Application.Mappings;

namespace Application.Queries;

public class PostQueries(IRepository<Post> postRepository) : IPostQueries
{
    public async Task<Result<PagedListDto<PostDto>>> GetPostsAsync(int page, int pageSize)
    {
        var posts = await postRepository.GetAllPagedAsync(
            queryable =>
                queryable.Where(x => x.Status == PostStatus.Published).OrderBy(x => x.PublishedAt),
            includes: new[]
            {
                nameof(User.UserRoles),
                $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}",
            },
            pageIndex: page,
            pageSize: pageSize
        );

        return Result.Success(posts.MapToDto());
    }
}
