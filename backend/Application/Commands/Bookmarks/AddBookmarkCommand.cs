using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Bookmarks;

public class AddBookmarkCommand : IRequest<Result<BookmarkDto>>
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }

    public AddBookmarkCommand(Guid postId, Guid userId)
    {
        PostId = postId;
        UserId = userId;
    }
}

public class AddBookmarkCommandValidator : AbstractValidator<AddBookmarkCommand>
{
    public AddBookmarkCommandValidator()
    {
        RuleFor(x => x.PostId).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
    }
}

public class AddBookmarkCommandHandler(
    IBridgeRepository<Bookmark> bookmarkRepository,
    IRepository<Post> postRepository
) : IRequestHandler<AddBookmarkCommand, Result<BookmarkDto>>
{
    public async Task<Result<BookmarkDto>> Handle(
        AddBookmarkCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);

        var post = await postRepository.GetByIdAsync(request.PostId);
        if (post == null)
        {
            return Result.Failure<BookmarkDto>(
                AppError.NotFound("Post not found."),
                ErrorType.NotFound
            );
        }

        var existing = await bookmarkRepository.GetAllAsync(
            query => query.Where(b => b.PostId == request.PostId && b.UserId == request.UserId)
        );

        if (existing.Any())
        {
            return Result.Failure<BookmarkDto>(
                AppError.BadRequest("Post is already bookmarked."),
                ErrorType.BadRequest
            );
        }

        var bookmark = new Bookmark
        {
            PostId = request.PostId,
            UserId = request.UserId,
            Post = null!,
            User = null!,
        };

        await bookmarkRepository.InsertAsync(bookmark);

        return Result.Success(bookmark.MapToDto());
    }
}
