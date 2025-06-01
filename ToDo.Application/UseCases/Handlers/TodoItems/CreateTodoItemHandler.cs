using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Validators;
using ToDo.Domain.Commands;
using ToDo.Domain.Entities;
using ToDo.Domain.Handlers;
using ToDo.Infra.Repositories;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class CreateTodoItemHandler(CreateTodoItemsValidator validator, TodoItemRepository repository) : IHandler<CreateTodoItemsCommand>
{
    public async Task<ICommandResult> Handle(CreateTodoItemsCommand command)
    {
        var result = await validator.ValidateAsync(command);

        if (!result.IsValid)
        {
            var errors = result.Errors.Select(x => x.ErrorMessage);
            return new CommandResult(false, string.Join(';', errors), null);
        }
        
        var todoItem = command.ToEntity();
        return !todoItem.IsValid ?
            new CommandResult(false, string.Join(';', todoItem.Notifications), null) :
            new CommandResult(true, "Tarefa cadastrada com sucesso!", todoItem.ToDto());
    }
}