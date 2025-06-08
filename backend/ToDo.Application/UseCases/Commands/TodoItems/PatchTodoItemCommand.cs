using ToDo.Application.Common.Requests.Commands;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record PatchTodoItemCommand(Guid Id, string UserId, DateOnly? DueDate, string? Title, string? Description) : ICommand;
