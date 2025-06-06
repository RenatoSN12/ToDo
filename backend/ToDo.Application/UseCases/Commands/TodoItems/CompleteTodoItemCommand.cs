using ToDo.Domain.Requests.Commands;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record CompleteTodoItemCommand(Guid Id, string UserId) : ICommand;