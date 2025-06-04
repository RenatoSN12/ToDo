using ToDo.Api.DTOs;
using ToDo.Application.UseCases.Commands.TodoItems;

namespace ToDo.Api.Extensions;

public static class DtoExtensions
{
    public static CreateTodoItemCommand ToCommand(this CreateTodoItemRequest request, string userId)
        => new(request.Title, request.DueDate, request.Description, userId);
    
    public static PatchTodoItemCommand ToCommand(this PatchTodoItemRequest request, Guid id, string userId)
        => new(id, userId, request.DueDate, request.Title, request.Description);
    
}