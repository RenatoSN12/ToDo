namespace ToDo.Domain.Entities;

public class TodoItem : Entity
{
    public string UserId { get; private set; } = string.Empty;
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public DateTime ExecutionDate { get; private set; }
    public bool IsCompleted { get; private set; }
}