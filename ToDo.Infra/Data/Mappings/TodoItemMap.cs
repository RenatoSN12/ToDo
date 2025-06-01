using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;

namespace ToDo.Infra.Data.Mappings;

public class TodoItemMap : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.ToTable("TodoItem");

        builder.HasKey(x => x.Id);
        
        builder.Property(x=> x.Title)
            .HasMaxLength(80)
            .HasColumnType("VARCHAR")
            .IsRequired();
        
        builder.Property(x => x.Description)
            .HasMaxLength(255)
            .HasColumnType("VARCHAR")
            .IsRequired(false);

        builder.Property(x => x.CompletedAt)
            .IsRequired(false)
            .HasColumnType("timestamp without time zone");
        
        builder.Property(x => x.CreatedAt)
            .IsRequired()
            .HasColumnType("timestamp without time zone");
        
        builder.Property(x=> x.DueDate)
            .IsRequired()
            .HasColumnType("timestamp without time zone");
        
        builder.Property(x=> x.IsCompleted)
            .IsRequired()
            .HasColumnType("BOOLEAN");

        builder.Property(x => x.UserId)
            .IsRequired()
            .HasColumnType("VARCHAR")
            .HasMaxLength(30);
        
        // Indexes

        builder.HasIndex(x => x.UserId);
        builder.HasIndex(x => x.DueDate);
        builder.HasIndex(x => new { x.UserId, x.DueDate });
    }
}