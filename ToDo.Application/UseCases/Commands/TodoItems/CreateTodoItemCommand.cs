using Commands_ICommand = ToDo.Domain.Requests.Commands.ICommand;
using ICommand = ToDo.Domain.Requests.Commands.ICommand;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record CreateTodoItemCommand(string Title, DateOnly DueDate, string? Description, string UserId) : Commands_ICommand;

