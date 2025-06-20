using ToDo.Api;
using ToDo.Api.Extensions;
using ToDo.Application;

var builder = WebApplication.CreateBuilder(args);

builder.AddConfiguration();

builder.Services.AddDbContext();

builder.AddJwtAuthentication();

builder.Services.ConfigureCors();

builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddDocumentation();

builder.Services.AddValidators();

builder.Services.AddHandlers();

builder.Services.AddInfra();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.ConfigureDevEnvironment();

app.UseHttpsRedirection();

app.UseCors(ApiConfiguration.CorsOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
