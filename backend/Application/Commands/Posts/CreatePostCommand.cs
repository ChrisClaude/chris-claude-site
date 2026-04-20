using System.Text.RegularExpressions;
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

public class CreatePostCommand : IRequest<Result<PostDto>>
{
    public string Title { get; set; }
    public string Thumbnail { get; set; }
    public string Content { get; set; }
    public string Excerpt { get; set; }
    public Guid AuthorId { get; set; }
    public IEnumerable<string> Tags { get; set; }

    public CreatePostCommand(
        string title,
        string thumbnail,
        string content,
        string excerpt,
        Guid authorId,
        IEnumerable<string> tags
    )
    {
        Title = title;
        Thumbnail = thumbnail;
        Content = content;
        Excerpt = excerpt;
        AuthorId = authorId;
        Tags = tags;
    }
}

public class CreatePostCommandValidator : AbstractValidator<CreatePostCommand>
{
    public CreatePostCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Thumbnail).NotEmpty();
        RuleFor(x => x.Content).NotEmpty();
        RuleFor(x => x.Excerpt).NotEmpty();
        RuleFor(x => x.AuthorId).NotEmpty();
        RuleFor(x => x.Tags).NotNull().NotEmpty();
    }
}

public class CreatePostCommandHandler(
    IRepository<Post> postRepository,
    IRepository<User> userRepository,
    IRepository<Tag> tagRepository
) : IRequestHandler<CreatePostCommand, Result<PostDto>>
{
    private static readonly Regex _nonAlphanumericRegex = new(
        @"[^a-z0-9\s-]",
        RegexOptions.Compiled
    );
    private static readonly Regex _whitespaceRegex = new(@"\s+", RegexOptions.Compiled);
    private static readonly Regex _multipleDashRegex = new(@"-{2,}", RegexOptions.Compiled);

    public async Task<Result<PostDto>> Handle(
        CreatePostCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);
        var user = await userRepository.GetByIdAsync(
            request.AuthorId,
            new[] { nameof(User.UserRoles), $"{nameof(User.UserRoles)}.{nameof(UserRole.Role)}" },
            new CacheKey($"user_{request.AuthorId}", 60)
        );

        if (user == null)
        {
            return Result.Failure<PostDto>(
                AppError.NotFound("User not found."),
                ErrorType.NotFound
            );
        }

        if (!user.CanPublish)
        {
            return Result.Failure<PostDto>(
                AppError.Unauthorized("User does not have permission to publish posts."),
                ErrorType.Unauthorized
            );
        }

        // Check if tags exist; only admins can create new tags
        var existingTags = await tagRepository.GetAllAsync(
            query => query.Where(t => request.Tags.Contains(t.Name)),
            cacheKey: new CacheKey($"tags_{string.Join("_", request.Tags)}", 60)
        );

        if (existingTags.Count != request.Tags.Count())
        {
            if (!user.IsAdmin)
            {
                return Result.Failure<PostDto>(
                    AppError.Unauthorized("Only admins can create posts with new tags."),
                    ErrorType.Unauthorized
                );
            }

            var existingTagNames = existingTags.Select(t => t.Name).ToHashSet();
            var newTagNames = request.Tags.Where(t => !existingTagNames.Contains(t)).ToList();
            var newTags = newTagNames
                .Select(name => new Tag
                {
                    Name = name,
                    CreatedAt = DateTimeOffset.UtcNow,
                    CreatedBy = request.AuthorId,
                    CreatedByUser = null!,
                    UpdatedByUser = null!,
                    PostTags = [],
                    PreviousState = string.Empty,
                    NewState = string.Empty,
                })
                .ToList();
            await tagRepository.InsertAsync(newTags);
            existingTags = existingTags.Concat(newTags).ToList();
        }

        var postTags = existingTags
            .Select(t => new PostTag
            {
                TagId = t.Id,
                Tag = t,
                Post = null!,
            })
            .ToList();

        var newPost = new Post
        {
            Title = request.Title,
            Thumbnail = request.Thumbnail,
            Content = request.Content,
            Excerpt = request.Excerpt,
            AuthorId = request.AuthorId,
            Slug = GenerateSlug(request.Title),
            Status = PostStatus.Draft,
            CreatedAt = DateTimeOffset.UtcNow,
            CreatedBy = request.AuthorId,
            PostTags = postTags,
            Author = null!,
            CreatedByUser = null!,
            UpdatedByUser = null!,
            Comments = [],
            PostReactions = [],
            Bookmarks = [],
            ProcessedNotifications = [],
            PreviousState = string.Empty,
            NewState = string.Empty,
        };

        await postRepository.InsertAsync(newPost);

        return Result.Success(newPost.MapToDto());
    }

    private static string GenerateSlug(string title)
    {
        var chars = new char[title.Length];
        for (var i = 0; i < title.Length; i++)
            chars[i] = char.ToLowerInvariant(title[i]);
        var slug = _nonAlphanumericRegex.Replace(new string(chars), string.Empty);
        slug = _whitespaceRegex.Replace(slug, "-");
        slug = _multipleDashRegex.Replace(slug, "-");
        return slug.Trim('-');
    }
}
