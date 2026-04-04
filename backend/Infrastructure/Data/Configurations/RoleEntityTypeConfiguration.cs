using Application.Entities;
using Application.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

#pragma warning disable IDE0058

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Name).IsRequired();

        builder.HasData(
            new Role { Id = RoleIds.ADMIN, Name = RoleName.ADMIN },
            new Role { Id = RoleIds.PUBLISHER, Name = RoleName.PUBLISHER },
            new Role { Id = RoleIds.READER, Name = RoleName.READER }
        );

#pragma warning restore IDE0058
    }
}
