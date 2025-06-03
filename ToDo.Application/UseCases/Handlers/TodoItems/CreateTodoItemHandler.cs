using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Validators;
using ToDo.Domain.Commands;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Handlers;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class CreateTodoItemHandler(
    CreateTodoItemsValidator validator,
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork) : IHandler<CreateTodoItemCommand>
{
    public async Task<ICommandResult> Handle(CreateTodoItemCommand command)
    {
        var result = await validator.ValidateAsync(command);

        if (!result.IsValid)
        {
            var errors = result.Errors.Select(x => x.ErrorMessage);
            return new CommandResult(false, string.Join(';', errors), null);
        }
        
        var todoItem = command.ToEntity();
        if (!todoItem.IsValid)
            return new CommandResult(false, string.Join(';', todoItem.Notifications), null);

        await repository.AddAsync(todoItem);
        await unitOfWork.CommitAsync();
        
        return new CommandResult(true, "Tarefa cadastrada com sucesso!", todoItem.ToDto());
    }
}