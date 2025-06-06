namespace ToDo.Domain.Entities;

public class User : Entity
{
    protected User()
    {
        
    }
    
    public User(string name, string email, string passwordHash)
    {
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
    }
    
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
}
