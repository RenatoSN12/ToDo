using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.Security;
using ToDo.Application.UseCases.Commands.Users;
using ToDo.Application.UseCases.Validators.Users;
using ToDo.Domain.Data.Repositories;

namespace ToDo.Application.UseCases.Handlers.Users;

public class LoginUserCommandHandler(
    IUserRepository repository,
    IPasswordHasher passwordHasher,
    LoginUserValidator validator) : ICommandHandler<LoginUserCommand>
{
    public async Task<Result> Handle(LoginUserCommand command)
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