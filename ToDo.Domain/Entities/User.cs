namespace ToDo.Domain.Entities;

public class User : Entity
{
    public string Username { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
}
