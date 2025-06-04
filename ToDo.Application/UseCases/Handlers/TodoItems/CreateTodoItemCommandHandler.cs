using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Validators;
using ToDo.Application.UseCases.Validators.TodoItems;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Handlers;
using ToDo.Domain.Requests;
using ToDo.Domain.Requests.Commands;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class CreateTodoItemCommandHandler(
    CreateTodoItemsValidator validator,
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork) : ICommandHandler<CreateTodoItemCommand>
{
    public async Task<IResult> Handle(CreateTodoItemCommand command)
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