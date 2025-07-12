using System;
using Application.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class NewsletterSignUpEntityTypeConfiguration : IEntityTypeConfiguration<NewsletterSignUp>
{
    public void Configure(EntityTypeBuilder<NewsletterSignUp> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Email).IsRequired();
    }
}
