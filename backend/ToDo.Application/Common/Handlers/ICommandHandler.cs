using ToDo.Application.Common.Requests.Commands;
using ToDo.Application.Common.Results;

namespace ToDo.Application.Common.Handlers;

public interface ICommandHandler<T> where T: ICommand
{
    Task<Result> Handle(T command);
}