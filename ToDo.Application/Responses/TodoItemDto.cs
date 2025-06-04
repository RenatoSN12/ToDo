namespace ToDo.Application.Responses;

public sealed record TodoItemDto(string Title, string? Description, DateTime? CompletedAt, DateOnly DueDate, bool IsCompleted);

