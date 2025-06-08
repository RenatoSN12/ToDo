using ToDo.Application.Common.Handlers;
using ToDo.Application.Common.Results;
using ToDo.Application.Mappers;
using ToDo.Application.Security;
using ToDo.Application.UseCases.Commands.Users;
using ToDo.Application.UseCases.Validators.Users;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;

namespace ToDo.Application.UseCases.Handlers.Users;

public class RegisterUserCommandHandler(
    IPasswordHasher passwordHasher,
    IUserRepository repository,
    IUnitOfWork unitOfWork,
    RegisterUserValidator validator) : ICommandHandler<RegisterUserCommand>
{
    public async Task<Result> Handle(RegisterUserCommand command)
    {
        var errors = await ValidateRequest(command);
        if (errors.Any())
            return new Result(400, string.Join(";", errors), null);

        var hashedPassword = passwordHasher.HashPassword(command.Password);
        var user = new User(command.Name, command.EmailAddress, hashedPassword);

        await repository.AddAsync(user);
        await unitOfWork.CommitAsync();
        
        return new Result(201, "Usuário cadastrado com sucesso!", user.ToDto());
    }

    private async Task<IEnumerable<string>> ValidateRequest(RegisterUserCommand command)
    {
        var commandValidate = await validator.ValidateAsync(command);
        if (!commandValidate.IsValid)
            return commandValidate.Errors.Select(x => x.ErrorMessage);

        if(await repository.EmailAlreadyExists(command.EmailAddress))
            return ["E-mail informado já está cadastrado no sistema."];
        
        return [];
    }
}