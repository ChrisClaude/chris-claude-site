using System;
using Application.Entities;
using Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<PostReaction> PostReactions { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<PostTag> PostTags { get; set; }
    public DbSet<Bookmark> Bookmarks { get; set; }
    public DbSet<NewsletterSignUp> NewsletterSignUps { get; set; }
    public DbSet<ProcessedNotification> ProcessedNotifications { get; set; }

    //TODO:  Should we store post views in a NoSQL database?
    // public DbSet<PostView> PostViews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserRoleEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new PostEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new CommentEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new PostReactionEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new TagEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new PostTagEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new BookmarkEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new NewsletterSignUpEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ProcessedNotificationEntityTypeConfiguration());
    }
}
