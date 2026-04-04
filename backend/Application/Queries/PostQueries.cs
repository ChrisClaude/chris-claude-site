using System;
using Application.Common;
using Application.Common.Dtos;
using Application.Interfaces.Queries;

namespace Application.Queries;

public class PostQueries : IPostQueries
{
    public Task<Result<PagedListDto<PostDto>>> GetPostsAsync(int page, int pageSize)
    {
        throw new NotImplementedException();
    }
}
