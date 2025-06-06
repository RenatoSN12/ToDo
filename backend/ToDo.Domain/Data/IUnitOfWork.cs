namespace ToDo.Domain.Data;

public interface IUnitOfWork
{
    Task CommitAsync();
}