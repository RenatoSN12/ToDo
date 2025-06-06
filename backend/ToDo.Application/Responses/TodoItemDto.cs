namespace ToDo.Application.Responses;

public sealed record TodoItemDto(Guid Id,string Title, string? Description, DateTime? CompletedAt, DateOnly DueDate, bool IsCompleted);

