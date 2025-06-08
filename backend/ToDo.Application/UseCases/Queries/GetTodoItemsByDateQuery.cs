using ToDo.Application.Common.Requests.Queries;

namespace ToDo.Application.UseCases.Queries;

public record GetTodoItemsByDateQuery(string UserId, DateOnly Date) : IQuery;