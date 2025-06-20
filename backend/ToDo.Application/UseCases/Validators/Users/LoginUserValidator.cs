using FluentValidation;
using ToDo.Application.UseCases.Commands.Users;

namespace ToDo.Application.UseCases.Validators.Users;

public class LoginUserValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserValidator()
    {
        RuleFor(x=> x.EmailAddress)
            .NotEmpty().WithMessage("O e-mail é obrigatório.")
            .MaximumLength(80).WithMessage("O e-mail deve possuir no máximo 80 caracteres.")
            .EmailAddress().WithMessage("O formato do e-mail informado é inválido.");
        
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("A senha é obrigatória.");
    }
}