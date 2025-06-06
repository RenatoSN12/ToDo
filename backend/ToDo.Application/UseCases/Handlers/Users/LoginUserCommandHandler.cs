using ToDo.Application.Abstractions.Security;
using ToDo.Application.Mappers;
using ToDo.Application.UseCases.Commands;
using ToDo.Application.UseCases.Commands.Users;
using ToDo.Application.UseCases.Results;
using ToDo.Application.UseCases.Validators.Users;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Handlers;
using ToDo.Domain.Requests;
using ToDo.Domain.Requests.Commands;

namespace ToDo.Application.UseCases.Handlers.Users;

public class LoginUserCommandHandler(
    IUserRepository repository,
    IPasswordHasher passwordHasher,
    LoginUserValidator validator) : ICommandHandler<LoginUserCommand>
{
    public async Task<IResult> Handle(LoginUserCommand command)
    {
        var validationResult = await validator.ValidateAsync(command);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(x => x.ErrorMessage);
            return new LoginResult(400, string.Join(";", errors));
        }
        
        var user = await repository.GetUserInfoByEmailAddress(command.EmailAddress);
        
        if(user == null || !passwordHasher.VerifyPassword(command.Password, user.PasswordHash))
            return new LoginResult(400, "Credênciais inválidas.");

        var data = new JwtData
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
        };
        
        return new LoginResult(data);
    }
}