using FluentValidation;
using ToDo.Application.UseCases.Commands.Users;

namespace ToDo.Application.UseCases.Validators.Users;

public class RegisterUserValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("É obrigatório informar o nome do usuário.")
            .MaximumLength(30).WithMessage("O nome do usuário deve possuir no máximo 120 caracteres.");
        
        RuleFor(x => x.EmailAddress)
            .NotEmpty().WithMessage("O e-mail é obrigatório.")
            .MaximumLength(80).WithMessage("O e-mail deve possuir no máximo 80 caracteres.")
            .EmailAddress().WithMessage("E-mail inválido.");
        
        RuleFor(p => p.Password)
            .NotEmpty().WithMessage("A senha não pode estar vazia.")
            .MinimumLength(8).WithMessage("A senha deve ter pelo menos 8 caracteres.")
            .MaximumLength(16).WithMessage("A senha não pode ter mais de 16 caracteres.")
            .Matches(@"[A-Z]+").WithMessage("A senha deve conter pelo menos uma letra maiúscula.")
            .Matches(@"[a-z]+").WithMessage("A senha deve conter pelo menos uma letra minúscula.")
            .Matches(@"[0-9]+").WithMessage("A senha deve conter pelo menos um número.")
            .Matches(@"[\!\?\*\.]+").WithMessage("A senha deve conter pelo menos um dos seguintes caracteres: ! ? * .");
    }
}