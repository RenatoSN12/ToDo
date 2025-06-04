using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;

namespace ToDo.Tests.Repositories;

public class FakeUserRepository : IUserRepository
{
    public Task AddAsync(User user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> EmailAlreadyExists(string emailAddress)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetUserInfoByEmailAddress(string emailAddress)
    {
        throw new NotImplementedException();
    }
}