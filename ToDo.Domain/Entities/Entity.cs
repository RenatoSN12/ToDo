using ToDo.Domain.Common.Notifications;

namespace ToDo.Domain.Entities;

public abstract class Entity : Notifiable
{
    protected Entity()
    {
        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;
    }
    
    public Guid Id { get; private set; }
    public DateTime CreatedAt { get; private set; }
}