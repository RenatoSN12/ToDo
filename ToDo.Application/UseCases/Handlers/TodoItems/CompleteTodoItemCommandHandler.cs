using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Handlers;
using ToDo.Domain.Requests;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class CompleteTodoItemCommandHandler(
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork
) : ICommandHandler<CompleteTodoItemCommand>
{
    public async Task<IResult> Handle(CompleteTodoItemCommand command)
    {
        var todoItem = await repository.GetByIdAsync(command.Id, command.UserId);
        if(todoItem is null)
            return new Result(404, "Tarefa não encontrada no sistema.", null);
        
        todoItem.Complete();

        if (!todoItem.IsValid)
            return new Result(400, string.Join(";",todoItem.Notifications), null);

        repository.Update(todoItem);
        await unitOfWork.CommitAsync();
        
        return new Result(200, "Tarefa encerrada com sucesso.", todoItem.ToDto());
    }
}