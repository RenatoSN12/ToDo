using Microsoft.EntityFrameworkCore;
using ToDo.Infra;
using ToDo.Infra.Data;

namespace ToDo.Api.Extensions;

public static class ServicesExtensions
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: ApiConfiguration.CorsOrigins,
                policy  =>
                {
                    policy.WithOrigins("http://localhost:5173", "http://localhost:5052")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });
    }
    
    public static void AddInfra(this IServiceCollection services)
        => services.AddInfrastructure();
    
    public static void AddDbContext(this IServiceCollection services)
        => services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                ApiConfiguration.ConnectionString,
                b => b.MigrationsAssembly("ToDo.Infra")));

    public static void AddDocumentation(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
}