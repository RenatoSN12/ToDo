using Microsoft.AspNetCore.Mvc;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Domain.Handlers;

namespace ToDo.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TodoItemsController(IHandler<CreateTodoItemCommand> handler) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateTodoItem(CreateTodoItemCommand command)
    {
        var result = (CommandResult)await handler.Handle(command);
        if (result.Success)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }
}