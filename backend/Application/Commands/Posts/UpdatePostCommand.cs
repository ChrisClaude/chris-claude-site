using Application.Caching;
using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Enums;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Posts;

public class UpdatePostCommand : IRequest<Result<PostDto>>
{
    public Guid PostId { get; set; }
    public Guid RequestingUserId { get; set; }
    public string Title { get; set; }
    public string Thumbnail { get; set; }
    public string Content { get; set; }
    public string Excerpt { get; set; }
    public PostStatus Status { get; set; }

    public UpdatePostCommand(
        Guid postId,
        Guid requestingUserId,
        string title,
        string thumbnail,
        string content,
        string excerpt,
        PostStatus status
    )
    {
        PostId = postId;
        RequestingUserId = requestingUserId;
        Title = title;
        Thumbnail = thumbnail;
        Content = content;
        Excerpt = excerpt;
        Status = status;
    }
}

public class UpdatePostCommandValidator : AbstractValidator<UpdatePostCommand>
{
    public UpdatePostCommandValidator()
    {
        RuleFor(x => x.PostId).NotEmpty();
        RuleFor(x => x.RequestingUserId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Thumbnail).NotEmpty();
        RuleFor(x => x.Content).NotEmpty();
        RuleFor(x => x.Excerpt).NotEmpty();
    }
}

public class UpdatePostCommandHandler(
    IRepository<Post> postRepository,
    IRepository<User> userRepository
) : IRequestHandler<UpdatePostCommand, Result<PostDto>>
{
    public async Task<Result<PostDto>> Handle(
        UpdatePostCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);

        var user = await userRepository.GetByIdAsync(
            request.RequestingUserId,
            new[] { nameof(User.UserRoles), $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}" },
            new CacheKey($"user_{request.RequestingUserId}", 60)
        );

        if (user == null)
        {
            return Result.Failure<PostDto>(
                AppError.NotFound("User not found."),
                ErrorType.NotFound
            );
        }

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

        if (post.AuthorId != request.RequestingUserId && !user.IsAdmin)
        {
            return Result.Failure<PostDto>(
                AppError.Unauthorized("You do not have permission to update this post."),
                ErrorType.Unauthorized
            );
        }

        post.Title = request.Title;
        post.Thumbnail = request.Thumbnail;
        post.Content = request.Content;
        post.Excerpt = request.Excerpt;
        post.Status = request.Status;
        post.UpdatedAt = DateTimeOffset.UtcNow;
        post.UpdatedBy = request.RequestingUserId;

        if (request.Status == PostStatus.Published && post.PublishedAt == null)
        {
            post.PublishedAt = DateTimeOffset.UtcNow;
        }

        await postRepository.UpdateAsync(post);

        return Result.Success(post.MapToDto());
    }
}
