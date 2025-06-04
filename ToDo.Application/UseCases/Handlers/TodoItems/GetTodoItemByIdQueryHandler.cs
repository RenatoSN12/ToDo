using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Queries;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Handlers;
using ToDo.Domain.Requests;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class GetTodoItemByIdQueryHandler(ITodoItemRepository repository) : IQueryHandler<GetTodoItemByIdQuery>
{
    public async Task<IResult> Handle(GetTodoItemByIdQuery query)
    {
        var todoItem = await repository.GetByIdAsync(query.Id, query.UserId);
        return todoItem is null ?
            new Result(404, "Tarefa não encontrada no sistema.", null) :
            new Result(200,"", todoItem.ToDto());
    }
}