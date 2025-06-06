namespace ToDo.Api.DTOs;

public record PatchTodoItemRequest(string? Title, string? Description, DateOnly? DueDate);