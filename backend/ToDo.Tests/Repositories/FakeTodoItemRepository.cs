using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;

namespace ToDo.Tests.Repositories;

public class FakeTodoItemRepository : ITodoItemRepository
{
    private readonly List<TodoItem> _tasks = [];
    
    public Task<TodoItem?> GetByIdAsync(Guid id)
    {
        var todoItem = _tasks.FirstOrDefault(x=>x.Id == id);
        return Task.FromResult(todoItem);
    }

    public Task<TodoItem?> GetByIdAsync(Guid id, string userId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<TodoItem>> GetAllByUserAsync(string userId)
    {
        var todoItems = _tasks.Where(x => x.UserId == userId);
        return Task.FromResult(todoItems);
    }

    public Task AddAsync(TodoItem task)
    {
        _tasks.Add(task);
        return Task.CompletedTask;
    }

    public void Update(TodoItem task)
    {
        throw new NotImplementedException();
    }

    public void Delete(TodoItem task)
    {
        throw new NotImplementedException();
    }
}