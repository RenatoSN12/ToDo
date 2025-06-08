using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class DeleteTodoItemCommandHandler(
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork
) : ICommandHandler<DeleteTodoItemCommand>
{
    public async Task<Result> Handle(DeleteTodoItemCommand command)
    {
        var todoItem = await repository.GetByIdAsync(command.Id, command.UserId);
        if (todoItem is null)
            return new Result(404, "Tarefa não encontrada no sistema.", null);
        
        if (IsAlreadyCompleted(todoItem))
            return new Result(400, "Não é possível excluir tarefas já concluídas", null);
        
        repository.Delete(todoItem);
        await unitOfWork.CommitAsync();

        return new Result(200, "Tarefa excluída com sucesso", null);
    }

    private bool IsAlreadyCompleted(TodoItem todoItem)
        => (todoItem.IsCompleted || todoItem.CompletedAt.HasValue); 
    
}