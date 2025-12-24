using Application.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class PostReactionEntityTypeConfiguration : IEntityTypeConfiguration<PostReaction>
{
    public void Configure(EntityTypeBuilder<PostReaction> builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
#pragma warning disable IDE0058

        builder.HasKey(x => new { x.PostId, x.UserId });

        builder
            .HasOne(x => x.Post)
            .WithMany(x => x.PostReactions)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(x => x.User)
            .WithMany(x => x.PostReactions)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
#pragma warning restore IDE0058
    }
}
