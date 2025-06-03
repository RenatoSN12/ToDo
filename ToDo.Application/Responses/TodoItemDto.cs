namespace ToDo.Application.Responses;

public record TodoItemDto(string Title, string? Description, DateTime? CompletedAt, DateOnly DueDate, bool IsCompleted);

