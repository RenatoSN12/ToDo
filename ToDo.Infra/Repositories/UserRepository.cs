using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Data.Repositories;
using ToDo.Domain.Entities;
using ToDo.Infra.Data;

namespace ToDo.Infra.Repositories;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task AddAsync(User user)
        => await context.Users.AddAsync(user);

    public async Task<bool> EmailAlreadyExists(string emailAddress)
        => await context.Users.AnyAsync(x => x.Email == emailAddress);

    public async Task<User?> GetUserInfoByEmailAddress(string emailAddress)
        => await context.Users.FirstOrDefaultAsync(x => x.Email == emailAddress);
}