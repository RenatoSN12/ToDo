using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Handlers.TodoItems;
using ToDo.Application.UseCases.Validators;
using ToDo.Domain.Handlers;

namespace ToDo.Application;

public static class DependencyInjection
{
    public static void AddValidators(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<CreateTodoItemsValidator>();
    }

    public static void AddHandlers(this IServiceCollection services)
    {
        services.AddScoped<IHandler<CreateTodoItemCommand>, CreateTodoItemHandler>();
    }
}