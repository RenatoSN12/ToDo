using Commands_ICommand = ToDo.Domain.Requests.Commands.ICommand;
using ICommand = ToDo.Domain.Requests.Commands.ICommand;

namespace ToDo.Application.UseCases.Commands.Users;

public sealed record LoginUserCommand(string EmailAddress, string Password) : Commands_ICommand;
