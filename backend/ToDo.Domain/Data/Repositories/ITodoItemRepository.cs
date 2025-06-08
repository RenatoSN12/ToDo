using ToDo.Domain.Entities;

namespace ToDo.Domain.Data.Repositories;

public interface ITodoItemRepository
{
    Task<TodoItem?> GetByIdAsync(Guid id, string userId);
    Task<IEnumerable<TodoItem>> GetAllByDate(string userId, DateOnly date);
    Task<IEnumerable<TodoItem>> GetManyById(Guid[] ids);
    Task AddAsync(TodoItem task);
    void Update(TodoItem task);
    void Delete(TodoItem task);
}