using Application.Common;
using Application.Common.Dtos;
using Application.Interfaces.Queries;
using BlogAPI.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
#pragma warning disable CA1515 // Controllers must be public for ASP.NET Core discovery
public sealed class UserController(IUserQueries userQueries) : BaseController
#pragma warning restore CA1515
{
    [HttpGet("me")]
    [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<IEnumerable<AppError>>(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetUserAsync()
    {
        var userDto = GetContextUser();
        var result = await userQueries.GetUserAsync(userDto.Id);

        return result.ToActionResult();
    }
}
