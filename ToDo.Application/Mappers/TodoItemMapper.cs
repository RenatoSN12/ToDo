using ToDo.Application.Responses;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Domain.Entities;

namespace ToDo.Application.Mappers;

public static class TodoItemMapper
{
    public static TodoItem ToEntity(this CreateTodoItemsCommand command) =>
        new(command.UserId, command.Title, command.DueDate, command.Description);

    public static TodoItemDto ToDto(this TodoItem entity) => new(entity.Title, entity.Description, entity.CompletedAt,
        entity.DueDate, entity.IsCompleted);
}