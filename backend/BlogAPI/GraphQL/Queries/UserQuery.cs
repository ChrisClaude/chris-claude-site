using Application.Common.Dtos;
using Application.Interfaces.Queries;
using BlogAPI.Extensions;
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

        var contextUser = httpContextAccessor.GetRequiredUser();

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
