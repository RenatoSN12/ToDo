using Commands_ICommand = ToDo.Application.Common.Requests.Commands.ICommand;
using ICommand = ToDo.Application.Common.Requests.Commands.ICommand;
using Requests_Commands_ICommand = ToDo.Application.Common.Requests.Commands.ICommand;

namespace ToDo.Application.UseCases.Commands.Users;

public sealed record LoginUserCommand(string EmailAddress, string Password) : Requests_Commands_ICommand;
