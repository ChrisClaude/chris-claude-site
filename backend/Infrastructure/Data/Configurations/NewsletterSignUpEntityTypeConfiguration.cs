using Application.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class NewsletterSignUpEntityTypeConfiguration : IEntityTypeConfiguration<NewsletterSignUp>
{
    public void Configure(EntityTypeBuilder<NewsletterSignUp> builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
#pragma warning disable IDE0058

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Email).IsRequired();

        builder
            .HasOne(x => x.CreatedByUser)
            .WithMany()
            .HasForeignKey(x => x.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(x => x.UpdatedByUser)
            .WithMany()
            .HasForeignKey(x => x.UpdatedBy)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);

#pragma warning restore IDE0058
    }
}
