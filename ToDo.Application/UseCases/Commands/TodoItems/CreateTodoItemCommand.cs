using ICommand = ToDo.Domain.Commands.ICommand;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record CreateTodoItemCommand(string UserId, string Title, DateOnly DueDate, string? Description = "") : ICommand;
