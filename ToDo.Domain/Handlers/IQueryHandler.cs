using ToDo.Domain.Requests;
using ToDo.Domain.Requests.Queries;

namespace ToDo.Domain.Handlers;

public interface IQueryHandler<T> where T : IQuery
{
    Task<IResult> Handle(T query);
}