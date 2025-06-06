using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.Abstractions.Security;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Infra.Data;
using ToDo.Infra.ExternalServices;
using ToDo.Infra.Repositories;

namespace ToDo.Infra;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ITodoItemRepository, TodoItemRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}