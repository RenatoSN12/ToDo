using FluentValidation;
using ToDo.Application.UseCases.Commands.TodoItems;

namespace ToDo.Application.UseCases.Validators.TodoItems;

public class PatchTodoItemValidator : AbstractValidator<PatchTodoItemCommand>
{
    public PatchTodoItemValidator()
    {
        RuleFor(x => x.Title)
            .MaximumLength(80).WithMessage("O título da tarefa deve ter no máximo 80 caracteres.")
            .When(x => !string.IsNullOrWhiteSpace(x.Title));
        
        RuleFor(x => x.Description)
            .MaximumLength(255).WithMessage("A descrição da tarefa deve ter no máximo 255 caracteres.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));
    }
}