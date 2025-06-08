using ToDo.Application.Common.Requests.Queries;

namespace ToDo.Application.UseCases.Queries;

public record GetTodoItemByIdQuery(Guid Id, string UserId) : IQuery;