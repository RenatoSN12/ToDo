using ToDo.Domain.Entities;

namespace ToDo.Domain.Repositories;

public interface ITodoItemRepository
{
    Task<TodoItem?> GetByIdAsync(Guid id);
    Task<IEnumerable<TodoItem>> GetAllByUserAsync(string userId);
    Task AddAsync(TodoItem task);
    void Update(TodoItem task);
    void Delete(TodoItem task);
}