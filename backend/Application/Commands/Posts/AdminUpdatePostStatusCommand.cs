using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Posts;

public class AdminUpdatePostStatusCommand : IRequest<Result<PostDto>>
{
    public Guid PostId { get; set; }
    public Guid AdminUserId { get; set; }
    public PostStatus Status { get; set; }

    public AdminUpdatePostStatusCommand(Guid postId, Guid adminUserId, PostStatus status)
    {
        PostId = postId;
        AdminUserId = adminUserId;
        Status = status;
    }
}

public class AdminUpdatePostStatusCommandValidator : AbstractValidator<AdminUpdatePostStatusCommand>
{
    public AdminUpdatePostStatusCommandValidator()
    {
        RuleFor(x => x.PostId).NotEmpty();
        RuleFor(x => x.AdminUserId).NotEmpty();
    }
}

public class AdminUpdatePostStatusCommandHandler(
    IRepository<Post> postRepository
) : IRequestHandler<AdminUpdatePostStatusCommand, Result<PostDto>>
{
    public async Task<Result<PostDto>> Handle(
        AdminUpdatePostStatusCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);

        var post = await postRepository.GetByIdAsync(
            request.PostId,
            new[]
            {
                nameof(Post.Author),
                nameof(Post.PostTags),
                $"{nameof(Post.PostTags)}.{nameof(PostTag.Tag)}",
            }
        );

        if (post == null || post.IsDeleted)
        {
            return Result.Failure<PostDto>(
                AppError.NotFound("Post not found."),
                ErrorType.NotFound
            );
        }

        post.Status = request.Status;
        post.UpdatedAt = DateTimeOffset.UtcNow;
        post.UpdatedBy = request.AdminUserId;

        if (request.Status == PostStatus.Published && post.PublishedAt == null)
        {
            post.PublishedAt = DateTimeOffset.UtcNow;
        }

        await postRepository.UpdateAsync(post);

        return Result.Success(post.MapToDto());
    }
}
