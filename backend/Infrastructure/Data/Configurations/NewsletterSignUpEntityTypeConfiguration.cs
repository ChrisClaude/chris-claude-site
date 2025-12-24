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

#pragma warning restore IDE0058
    }
}
