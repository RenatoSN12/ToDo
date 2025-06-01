using ToDo.Domain.Commands;

namespace ToDo.Domain.Handlers;

public interface IHandler<T> where T: ICommand
{
    Task<ICommandResult> Handle(T command);
}