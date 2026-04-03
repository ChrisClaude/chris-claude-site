using Application.Common.Dtos;
using Application.Enums;
using BlogAPI.GraphQL.Errors;

namespace BlogAPI.Extensions;

internal static class HttpContextAccessorExtensions
{
    public static UserDto? GetUser(this IHttpContextAccessor accessor) =>
        accessor.HttpContext?.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY] as UserDto;

    public static UserDto GetRequiredUser(this IHttpContextAccessor accessor) =>
        accessor.GetUser() ?? throw new UserContextException();
}
