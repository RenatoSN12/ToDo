using ToDo.Application.Responses;
using ToDo.Domain.Entities;

namespace ToDo.Application.Mappers;

public static class UserMapper
{
    public static UserDto ToDto(this User user) => new(user.Name, user.Email);
}