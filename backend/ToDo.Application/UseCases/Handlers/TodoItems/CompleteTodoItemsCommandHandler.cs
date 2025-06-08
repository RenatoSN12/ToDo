using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class CompleteTodoItemsCommandHandler(
    ITodoItemRepository repository,
    IUnitOfWork unitOfWork
) : ICommandHandler<CompleteTodoItemsCommand>
{
    public async Task<Result> Handle(CompleteTodoItemsCommand command)
    {
        var todoItems = (await repository.GetManyById(command.Ids)).ToList();
        
        if(command.Ids.Length != todoItems.Count)
        {
            var notFoundIds = command.Ids.Except(todoItems.Select(x => x.Id));
            return new Result(404, $"IDs não encontrados: {string.Join(", ", notFoundIds)}", null);
        }

        foreach (var todoItem in todoItems)
            todoItem.Complete();

        if (todoItems.Any(x => !x.IsValid))
        {
            var invalidItems = todoItems
                .Where(x => !x.IsValid)
                .ToList();

            var errors = invalidItems
                .SelectMany(x => x.Notifications.Select(n => $"{x.Title} - {n}"))
                .ToList();
            
            return new Result(400, string.Join(";", errors), null);
        }

        foreach (var todoItem in todoItems)
            repository.Update(todoItem);

        await unitOfWork.CommitAsync();
        
        return new Result(200, "Tarefa encerrada com sucesso.", todoItems.Select(x=> x.ToDto()));
    }
}