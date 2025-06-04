using ToDo.Domain.Requests.Queries;

namespace ToDo.Application.UseCases.Queries;

public record GetTodoItemByIdQuery(Guid Id, string UserId) : IQuery;