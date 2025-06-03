namespace ToDo.Api.Extensions;

public static class AppExtensions
{
    public static void ConfigureDevEnvironment(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
}