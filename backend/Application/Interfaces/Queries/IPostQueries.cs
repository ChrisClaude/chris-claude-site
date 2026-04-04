using Application.Common;
using Application.Common.Dtos;

namespace Application.Interfaces.Queries;

public interface IPostQueries
{
    public Task<Result<PagedListDto<PostDto>>> GetPostsAsync(int page, int pageSize);
}
