using ToDo.Domain.Commands;

namespace ToDo.Application.UseCases.Commands;

public record CommandResult(bool Success, string Message, object? Data) : ICommandResult, ICommand
{
    public bool Success { get; set; } = Success;
    public string Message { get; set; } = Message;
    public object? Data { get; set; } = Data;
}
