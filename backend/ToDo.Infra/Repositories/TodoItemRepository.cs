using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;
using ToDo.Infra.Data;

namespace ToDo.Infra.Repositories;

public class TodoItemRepository(AppDbContext context) : ITodoItemRepository
{
    public async Task<TodoItem?> GetByIdAsync(Guid id, string userId)
        => await context.Tasks.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

    public async Task<IEnumerable<TodoItem>> GetAllByDate(string userId, DateOnly date)
        => await context.Tasks.AsNoTracking().Where(t => t.UserId == userId && t.DueDate == date).ToListAsync();

    public async Task AddAsync(TodoItem task)
        => await context.Tasks.AddAsync(task);

    public void Update(TodoItem task)
        => context.Update(task);

    public void Delete(TodoItem task)
        => context.Remove(task);
}