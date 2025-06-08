using ToDo.Application.Common.Requests.Queries;
using ToDo.Application.Common.Results;

namespace ToDo.Application.Common.Handlers;

public interface IQueryHandler<T> where T : IQuery
{
    Task<Result> Handle(T query);
}