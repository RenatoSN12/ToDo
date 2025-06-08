using Microsoft.AspNetCore.Mvc;
using ToDo.Api.Extensions;
using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.UseCases;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.Users;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace ToDo.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class UserController(
    ICommandHandler<LoginUserCommand> loginCommandHandler,
    ICommandHandler<RegisterUserCommand> registerCommandHandler) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IResult> Login([FromBody] LoginUserCommand command)
    {
        var result = (LoginResult)await loginCommandHandler.Handle(command);
        if(!result.Success)
            return TypedResults.Json(result, statusCode: result.StatusCode);

        result.JwtData!.Token = JwtExtensions.GenerateJwtToken(result.JwtData);
        return TypedResults.Ok(result);
    }
    
    [HttpPost("register")]
    public async Task<IResult> Register([FromBody] RegisterUserCommand command)
    {
        var result = await registerCommandHandler.Handle(command);
        return !result.Success ?
            TypedResults.Json(result, statusCode: result.StatusCode) :
            TypedResults.Created("/", result);
    }
}