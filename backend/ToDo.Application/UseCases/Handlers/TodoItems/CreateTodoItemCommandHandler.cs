using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Validators.TodoItems;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class CreateTodoItemCommandHandler(
    CreateTodoItemsValidator validator,
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork) : ICommandHandler<CreateTodoItemCommand>
{
    public async Task<Result> Handle(CreateTodoItemCommand command)
    {
        var result = await validator.ValidateAsync(command);

        if (!result.IsValid)
        {
            var errors = result.Errors.Select(x => x.ErrorMessage);
            return new Result(400, string.Join(';', errors), null);
        }
        
        var todoItem = command.ToEntity();
        if (!todoItem.IsValid)
            return new Result(400, string.Join(';', todoItem.Notifications), null);

        await repository.AddAsync(todoItem);
        await unitOfWork.CommitAsync();
        
        return new Result(201, "Tarefa cadastrada com sucesso!", todoItem.ToDto());
    }
}