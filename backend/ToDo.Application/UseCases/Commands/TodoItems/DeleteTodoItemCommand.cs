using ToDo.Domain.Requests.Commands;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public sealed record DeleteTodoItemCommand(Guid Id, string UserId): ICommand;