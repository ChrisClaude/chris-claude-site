using System;
using Application.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ProcessedNotificationEntityTypeConfiguration
    : IEntityTypeConfiguration<ProcessedNotification>
{
    public void Configure(EntityTypeBuilder<ProcessedNotification> builder)
    {
        builder.HasKey(x => new { x.PostId, x.NewsletterSignUpId });

        builder
            .HasOne(x => x.Post)
            .WithMany(x => x.ProcessedNotifications)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(x => x.NewsletterSignUp)
            .WithMany(x => x.ProcessedNotifications)
            .HasForeignKey(x => x.NewsletterSignUpId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
