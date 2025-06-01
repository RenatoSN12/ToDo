using ICommand = ToDo.Domain.Commands.ICommand;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record CreateTodoItemsCommand(string UserId, string Title, DateTime DueDate, string? Description = "") : ICommand;
