using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Bookmarks;

public class RemoveBookmarkCommand : IRequest<Result<BookmarkDto>>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }

    public RemoveBookmarkCommand(Guid postId, Guid userId)
    {
        PostId = postId;
        UserId = userId;
    }
}

public class RemoveBookmarkCommandValidator : AbstractValidator<RemoveBookmarkCommand>
{
    public RemoveBookmarkCommandValidator()
    {
        RuleFor(x => x.PostId).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
    }
}

public class RemoveBookmarkCommandHandler(
    IBridgeRepository<Bookmark> bookmarkRepository
) : IRequestHandler<RemoveBookmarkCommand, Result<BookmarkDto>>
{
    public async Task<Result<BookmarkDto>> Handle(
        RemoveBookmarkCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);

        var bookmarks = await bookmarkRepository.GetAllAsync(
            query => query.Where(b => b.PostId == request.PostId && b.UserId == request.UserId)
        );

        var bookmark = bookmarks.FirstOrDefault();
        if (bookmark == null)
        {
            return Result.Failure<BookmarkDto>(
                AppError.NotFound("Bookmark not found."),
                ErrorType.NotFound
            );
        }

        await bookmarkRepository.DeleteAsync(bookmark);

        return Result.Success(bookmark.MapToDto());
    }
}
