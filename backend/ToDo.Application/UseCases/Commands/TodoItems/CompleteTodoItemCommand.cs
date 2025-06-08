using ToDo.Application.Common.Requests.Commands;

namespace ToDo.Application.UseCases.Commands.TodoItems;

public record CompleteTodoItemsCommand(Guid[] Ids) : ICommand;