using FluentValidation;
using ToDo.Application.UseCases.Commands.TodoItems;

namespace ToDo.Application.UseCases.Validators.TodoItems;

public class CreateTodoItemsValidator : AbstractValidator<CreateTodoItemCommand>
{
    public CreateTodoItemsValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("O título da tarefa é obrigatório.")
            .MaximumLength(80).WithMessage("O título da tarefa deve ter no máximo 80 caracteres.");
        
        RuleFor(x => x.Description)
            .MaximumLength(255).WithMessage("A descrição da tarefa deve ter no máximo 255 caracteres.");

        RuleFor(x => x.DueDate)
            .NotNull().WithMessage("O prazo de execução da tarefa deve ser informado.");
    }
}