using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;

namespace ToDo.Infra.Data.Mappings;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Username)
            .HasMaxLength(30)
            .HasColumnType("VARCHAR")
            .IsRequired();

        builder.Property(x => x.PasswordHash)
            .HasMaxLength(200)
            .IsRequired();
        
        builder.Property(x=> x.CreatedAt)
            .HasColumnType("timestamp without time zone")
            .IsRequired();
        
        // Indexes

        builder.HasIndex(x => x.Username);
    }
}