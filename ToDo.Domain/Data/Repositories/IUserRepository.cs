using ToDo.Domain.Entities;

namespace ToDo.Domain.Data.Repositories;

public interface IUserRepository
{
    Task AddAsync(User user);
    Task<bool> EmailAlreadyExists(string emailAddress);
    Task<User?> GetUserInfoByEmailAddress(string emailAddress);
}