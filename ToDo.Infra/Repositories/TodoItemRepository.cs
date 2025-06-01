using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Entities;
using ToDo.Domain.Repositories;
using ToDo.Infra.Data;

namespace ToDo.Infra.Repositories;

public class TodoItemRepository(AppDbContext context) : ITodoItemRepository
{
    public async Task<TodoItem?> GetByIdAsync(Guid id)
        => await context.Tasks.FindAsync(id);

    public async Task<IEnumerable<TodoItem>> GetAllByUserAsync(string userId)
        => await context.Tasks.AsNoTracking().Where(t => t.UserId == userId).ToListAsync();

    public async Task AddAsync(TodoItem task)
        => await context.Tasks.AddAsync(task);

    public void Update(TodoItem task)
        => context.Update(task);

    public void Delete(TodoItem task)
        => context.Remove(task);
}