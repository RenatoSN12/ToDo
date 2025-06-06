using ToDo.Domain.Common.Extensions;

namespace ToDo.Domain.Entities;

public class TodoItem : Entity
{
    public TodoItem() {}
    public TodoItem(string userId, string title, DateOnly dueDate, string? description = "")
    {
        UserId = userId;
        Title = title;
        Description = description;
        ChangeDueDate(dueDate);
    }
    public string UserId { get; private set; } = string.Empty;
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public DateOnly DueDate { get; private set; }
    public bool IsCompleted { get; private set; }

    public void Complete()
    {
        if (IsCompleted || CompletedAt.HasValue)
        {
            AddNotification("Não é possível completar uma tarefa que já está finalizada.");
            return;
        }
        
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
    }

    public void ChangeTitle(string newTitle)
    {
        if (ValidateChangeWhenAlreadyCompleted("o título")) return;
        
        Title = newTitle;
    }

    public void ChangeDescription(string newDescription)
    {
        if (ValidateChangeWhenAlreadyCompleted("a descrição")) return;
        
        Description = newDescription;
    }
    public void ChangeDueDate(DateOnly dueDate)
    {
        if (ValidateChangeWhenAlreadyCompleted("o prazo de execução")) return;

        if (dueDate < DateTime.Now.ToDateOnly())
        {
            AddNotification("O prazo de execução da tarefa deve ser futuro.");
            return;
        }
        
        DueDate = dueDate;
    }
    
    private bool ValidateChangeWhenAlreadyCompleted(string fieldName)
    {
        if (!IsCompleted && !CompletedAt.HasValue)
            return false;

        AddNotification($"Não é possível alterar {fieldName} de uma tarefa já concluída.");
        return true;
    }

}