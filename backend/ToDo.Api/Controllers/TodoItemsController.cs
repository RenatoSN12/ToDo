using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Api.DTOs;
using ToDo.Api.Extensions;
using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Queries;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace ToDo.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/tasks")]
public class TodoItemsController(
    ICommandHandler<CreateTodoItemCommand> createCommandHandler,
    ICommandHandler<PatchTodoItemCommand> patchCommandHandler,
    ICommandHandler<DeleteTodoItemCommand> deleteCommandHandler,
    ICommandHandler<CompleteTodoItemsCommand> completeHandler,
    IQueryHandler<GetTodoItemsByDateQuery> getByDateHandler,
    IQueryHandler<GetTodoItemByIdQuery> getByIdHandler
) : ControllerBase
{
    [HttpPost]
    public async Task<IResult> CreateTodoItem(CreateTodoItemRequest request)
    {
        var userId = HttpContext.User.GetEmail();
        
        var result = await createCommandHandler.Handle(request.ToCommand(userId));
        return TypedResults.Json(result, statusCode: result.StatusCode);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IResult> DeleteTodoItem(Guid id)
    {
        var userId = HttpContext.User.GetEmail();
        var result = await deleteCommandHandler.Handle(new DeleteTodoItemCommand(id, userId));
        return TypedResults.Json(result, statusCode: result.StatusCode);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IResult> PatchTodoItem(Guid id, [FromBody] PatchTodoItemRequest request)
    {
        var userId = HttpContext.User.GetEmail();
        var result = await patchCommandHandler.Handle(request.ToCommand(id, userId));
        return TypedResults.Json(result, statusCode: result.StatusCode);
    }

    [HttpPatch("complete")]
    public async Task<IResult> CompleteTodoItem([FromBody] CompleteTodoItemsCommand command)
    {
        var result = await completeHandler.Handle(command);
        return TypedResults.Json(result, statusCode: result.StatusCode);
    }

    [HttpGet]
    public async Task<IResult> GetByDate([FromQuery] DateOnly date)
    {
        var userId = HttpContext.User.GetEmail();
        var result = await getByDateHandler.Handle(new GetTodoItemsByDateQuery(userId, date));
        return TypedResults.Json(result, statusCode: result.StatusCode);
    }

    [HttpGet("{id:guid}")]
    public async Task<IResult> GetById(Guid id)
    {
        var userId = HttpContext.User.GetEmail();
        var result = await getByIdHandler.Handle(new GetTodoItemByIdQuery(id, userId));
        return TypedResults.Json(result, statusCode: result.StatusCode);
    }
}