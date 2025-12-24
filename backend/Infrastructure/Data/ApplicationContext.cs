using Application.Entities;
using Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

#pragma warning disable IDE0058

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

#pragma warning disable S125  // Sections of code should not be commented out
#pragma warning disable S1135
    //TODO:  Should we store post views in a NoSQL database?
    // public DbSet<PostView> PostViews { get; set; }

#pragma warning restore S125 // Sections of code should not be commented out
#pragma warning restore S1135

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ArgumentNullException.ThrowIfNull(modelBuilder);
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
#pragma warning restore IDE0058
