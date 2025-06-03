using Microsoft.Extensions.DependencyInjection;
using ToDo.Domain.Data;
using ToDo.Domain.Data.Repositories;
using ToDo.Infra.Data;
using ToDo.Infra.Repositories;

namespace ToDo.Infra;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ITodoItemRepository, TodoItemRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}