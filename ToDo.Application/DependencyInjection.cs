using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.UseCases.Commands.TodoItems;
using ToDo.Application.UseCases.Commands.Users;
using ToDo.Application.UseCases.Handlers.TodoItems;
using ToDo.Application.UseCases.Handlers.Users;
using ToDo.Application.UseCases.Queries;
using ToDo.Application.UseCases.Validators;
using ToDo.Application.UseCases.Validators.TodoItems;
using ToDo.Application.UseCases.Validators.Users;
using ToDo.Domain.Handlers;

namespace ToDo.Application;

public static class DependencyInjection
{
    public static void AddValidators(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<CreateTodoItemsValidator>();
        services.AddValidatorsFromAssemblyContaining<RegisterUserValidator>();
    }

    public static void AddHandlers(this IServiceCollection services)
    {
        services.AddScoped<ICommandHandler<CreateTodoItemCommand>, CreateTodoItemCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteTodoItemCommand>, DeleteTodoItemCommandHandler>();
        services.AddScoped<ICommandHandler<PatchTodoItemCommand>, PatchTodoItemCommandHandler>();
        services.AddScoped<ICommandHandler<RegisterUserCommand>, RegisterUserCommandHandler>();
        services.AddScoped<ICommandHandler<LoginUserCommand>, LoginUserCommandHandler>();
        services.AddScoped<ICommandHandler<CompleteTodoItemCommand>, CompleteTodoItemCommandHandler>();
        services.AddScoped<IQueryHandler<GetTodoItemsByDateQuery>, GetTodoItemsByDateCommandHandler>();
        services.AddScoped<IQueryHandler<GetTodoItemByIdQuery>, GetTodoItemByIdQueryHandler>();
    }
}