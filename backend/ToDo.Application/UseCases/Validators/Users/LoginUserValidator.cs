using FluentValidation;
using ToDo.Application.UseCases.Commands.Users;

namespace ToDo.Application.UseCases.Validators.Users;

public class LoginUserValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserValidator()
    {
        RuleFor(x=> x.EmailAddress)
            .NotEmpty().WithMessage("O e-mail é obrigatório.")
            .EmailAddress().WithMessage("O formato do e-mail informado é inválido.");
        
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("A senha é obrigatória.");
    }
}