using ToDo.Application.Common.Requests.Commands;

namespace ToDo.Application.UseCases.Commands.Users;

public sealed record RegisterUserCommand(string Name, string EmailAddress, string Password) : ICommand;