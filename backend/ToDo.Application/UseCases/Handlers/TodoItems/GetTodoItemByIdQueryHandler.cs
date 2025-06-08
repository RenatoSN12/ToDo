using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Queries;
using ToDo.Domain.Data.Repositories;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class GetTodoItemByIdQueryHandler(ITodoItemRepository repository) : IQueryHandler<GetTodoItemByIdQuery>
{
    public async Task<Result> Handle(GetTodoItemByIdQuery query)
    {
        var todoItem = await repository.GetByIdAsync(query.Id, query.UserId);
        return todoItem is null ?
            new Result(404, "Tarefa não encontrada no sistema.", null) :
            new Result(200,"", todoItem.ToDto());
    }
}