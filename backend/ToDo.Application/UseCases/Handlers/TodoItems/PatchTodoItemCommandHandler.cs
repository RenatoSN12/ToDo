using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Results;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;
using ToDo.Domain.Handlers;
using ToDo.Domain.Requests;
using ToDo.Domain.Requests.Commands;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class PatchTodoItemCommandHandler(
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork
) : ICommandHandler<PatchTodoItemCommand>
{
    public async Task<IResult> Handle(PatchTodoItemCommand command)
    {
        var todoItem = await repository.GetByIdAsync(command.Id, command.UserId);
        if (todoItem is null)
            return new Result(404, "Tarefa não encontrada no sistema.",null);

        if (IsAlreadyCompleted(todoItem))
            return new Result(400, "Não é possível alterar tarefas já concluídas.", null);

        var updated = UpdateFields(todoItem, command);

        if (!todoItem.IsValid)
            return new Result(400,string.Join(";",todoItem.Notifications), null);
        
        if (!updated)
            return new Result(400, "Nenhuma alteração foi enviada para alteração.", null);
            
        repository.Update(todoItem);
        await unitOfWork.CommitAsync();
        return new Result(200, "Tarefa foi alterada com sucesso.", todoItem.ToDto());
    }

    private bool UpdateFields(TodoItem todoItem, PatchTodoItemCommand command)
    {
        var updated = false;

        if (command.Title is not null)
        {
            todoItem.ChangeTitle(command.Title);
            updated = true;
        }

        if (command.Description is not null)
        {
            todoItem.ChangeDescription(command.Description);
            updated = true;
        }

        if (command.DueDate is not null)
        {
            todoItem.ChangeDueDate(command.DueDate.Value);
            updated = true;
        }
        return updated;
    }
    
    private bool IsAlreadyCompleted(TodoItem todoItem)
        => (todoItem.IsCompleted || todoItem.CompletedAt.HasValue); 
}