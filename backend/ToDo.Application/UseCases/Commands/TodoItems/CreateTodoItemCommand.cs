using Commands_ICommand = ToDo.Application.Common.Requests.Commands.ICommand;
using ICommand = ToDo.Application.Common.Requests.Commands.ICommand;
using Requests_Commands_ICommand = ToDo.Application.Common.Requests.Commands.ICommand;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record CreateTodoItemCommand(string Title, DateOnly DueDate, string? Description, string UserId) : Requests_Commands_ICommand;

