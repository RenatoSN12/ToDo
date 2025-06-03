using ToDo.Api.Extensions;
using ToDo.Application;

var builder = WebApplication.CreateBuilder(args);

builder.AddConfiguration();

builder.Services.AddDbContext();

builder.Services.AddControllers();

builder.Services.AddDocumentation();

builder.Services.AddValidators();

builder.Services.AddHandlers();

builder.Services.AddInfra();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.ConfigureDevEnvironment();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Hello World!");

app.Run();
