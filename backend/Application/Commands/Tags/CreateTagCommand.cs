using Application.Caching;
using Application.Common;
using Application.Common.Dtos;
using Application.Entities;
using Application.Interfaces;
using Application.Mappings;
using FluentValidation;
using MediatR;

namespace Application.Commands.Tags;

public class CreateTagCommand : IRequest<Result<TagDto>>
{
    public string Name { get; set; }
    public Guid CreatedByUserId { get; set; }

    public CreateTagCommand(string name, Guid createdByUserId)
    {
        Name = name;
        CreatedByUserId = createdByUserId;
    }
}

public class CreateTagCommandValidator : AbstractValidator<CreateTagCommand>
{
    public CreateTagCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.CreatedByUserId).NotEmpty();
    }
}

public class CreateTagCommandHandler(IRepository<Tag> tagRepository)
    : IRequestHandler<CreateTagCommand, Result<TagDto>>
{
    public async Task<Result<TagDto>> Handle(
        CreateTagCommand request,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(request);

        var normalizedName = request.Name.Trim().ToUpperInvariant();

        var existing = await tagRepository.GetAllAsync(
            query => query.Where(t => t.Name == normalizedName),
            cacheKey: new CacheKey($"tag_exists_{normalizedName}", 60)
        );

        if (existing.Count > 0)
        {
            return Result.Failure<TagDto>(
                AppError.Conflict($"A tag named '{normalizedName}' already exists."),
                ErrorType.BadRequest
            );
        }

        var tag = new Tag
        {
            Name = normalizedName,
            CreatedAt = DateTimeOffset.UtcNow,
            CreatedBy = request.CreatedByUserId,
            CreatedByUser = null!,
            UpdatedByUser = null!,
            PostTags = [],
            PreviousState = string.Empty,
            NewState = string.Empty,
        };

        await tagRepository.InsertAsync(tag);

        return Result.Success(tag.MapToDto());
    }
}
