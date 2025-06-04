namespace ToDo.Api.DTOs;

public record CreateTodoItemRequest(string Title, DateOnly DueDate, string? Description);
