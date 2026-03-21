using System;
using Application.Common;
using Application.Common.Dtos;
using Application.Enums;
using Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace Application.Behaviors;

public sealed class AuthRequestBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : AuthenticatedRequest<TResponse>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthRequestBehavior(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor =
            httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);
        ArgumentNullException.ThrowIfNull(next);
        if (
            _httpContextAccessor.HttpContext.Items[Constant.HTTP_CONTEXT_USER_ITEM_KEY]
            is UserDto userDto
        )
        {
            request.UserDto = userDto;
        }
        else
        {
            Log.Error("User details not found in the request context.");
            throw new HttpContextUserLoadingProcessFailureException(
                "User details not found in the request context."
            );
        }

        return await next(cancellationToken);
    }
}
