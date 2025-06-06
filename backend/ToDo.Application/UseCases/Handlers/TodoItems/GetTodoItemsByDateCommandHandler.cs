using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Queries;
using ToDo.Application.UseCases.Results;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Handlers;
using ToDo.Domain.Requests;

namespace ToDo.Application.UseCases.Handlers.TodoItems;

public class GetTodoItemsByDateCommandHandler(ITodoItemRepository repository) : IQueryHandler<GetTodoItemsByDateQuery>
{
    public async Task<IResult> Handle(GetTodoItemsByDateQuery query)
    {
        var todoItems = await repository.GetAllByDate(query.UserId, query.Date);
        return !todoItems.Any() ?
            new Result(404, "Não foram encontradas tarefas para o dia escolhido.", null) :
            new Result(200, "", todoItems.Select(x=> x.ToDto()));
    }
}