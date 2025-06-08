using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Queries;
using ToDo.Domain.Data.Repositories;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class GetTodoItemsByDateCommandHandler(ITodoItemRepository repository) : IQueryHandler<GetTodoItemsByDateQuery>
{
    public async Task<Result> Handle(GetTodoItemsByDateQuery query)
    {
        var todoItems = await repository.GetAllByDate(query.UserId, query.Date);
        return !todoItems.Any() ?
            new Result(404, "Não foram encontradas tarefas para o dia escolhido.", null) :
            new Result(200, "", todoItems.Select(x=> x.ToDto()));
    }
}