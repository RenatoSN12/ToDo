using ToDo.Domain.Requests;
using ToDo.Domain.Requests.Commands;

namespace ToDo.Domain.Handlers;

public interface ICommandHandler<T> where T: ICommand
{
    Task<IResult> Handle(T command);
}