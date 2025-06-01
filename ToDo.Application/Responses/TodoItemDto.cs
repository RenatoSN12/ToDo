namespace ToDo.Application.Responses;

public record TodoItemDto(string Title, string? Description, DateTime? CompletedAt, DateTime DueDate, bool IsCompleted);

