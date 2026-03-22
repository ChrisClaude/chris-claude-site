using Application.Common.Dtos;
using Application.Enums;
using Application.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers;

#pragma warning disable CA1515 // Controllers must be public for ASP.NET Core discovery
public abstract class BaseController : ControllerBase
#pragma warning restore CA1515
{
    /// <summary>
    /// Gets the user from the request context.
    /// </summary>
    /// <exception cref="HttpContextUserLoadingProcessFailureException">Thrown when the user is not found in the request context.</exception>
    [System.Diagnostics.CodeAnalysis.SuppressMessage(
        "Design",
        "CA1024:Use properties where appropriate",
        Justification = "Method throws an exception, which is not allowed in property getters (CA1065)."
    )]
    protected UserDto GetContextUser()
    {
        if (HttpContext.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY] is UserDto userDto)
        {
            return userDto;
        }

        throw new HttpContextUserLoadingProcessFailureException(
            "User details not found in the request context."
        );
    }
}
