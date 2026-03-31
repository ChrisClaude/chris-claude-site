using Application.Common.Dtos;
using Application.Enums;
using Application.Exceptions;
using Application.Interfaces.Queries;
using HotChocolate.Authorization;

namespace BlogAPI.GraphQL.Queries;

[QueryType]
internal static class UserQuery
{
    [Authorize]
    public static async Task<UserDto> MeAsync(
        [Service] IUserQueries userQueries,
        IHttpContextAccessor httpContextAccessor
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        ArgumentNullException.ThrowIfNull(userQueries);

        if (
            httpContextAccessor.HttpContext?.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY]
            is not UserDto contextUser
        )
        {
            throw new GraphQLException(
                ErrorBuilder
                    .New()
                    .SetMessage("User details not found in the request context.")
                    .SetCode("UNAUTHENTICATED")
                    .Build()
            );
        }

        var result = await userQueries.GetUserAsync(contextUser.Id);

        if (result.IsFailure)
        {
            throw new GraphQLException(
                result
                    .Errors.Select(e =>
                        ErrorBuilder.New().SetMessage(e.Description).SetCode(e.Code).Build()
                    )
                    .ToList()
            );
        }

        return result.Value;
    }
}
