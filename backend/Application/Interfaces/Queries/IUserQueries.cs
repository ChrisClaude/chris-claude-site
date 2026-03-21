using System;
using Application.Common;
using Application.Common.Dtos;

namespace Application.Interfaces.Queries;

public interface IUserQueries
{
    public Task<Result<UserDto>> GetUserAsync(Guid id);
    public Task<Result<PagedListDto<UserDto>>> GetUsersAsync(int page, int pageSize);
}
