using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Entities;

namespace ToDo.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TodoItem> Tasks { get; set; }
    public DbSet<User> Users { get; set; }
}