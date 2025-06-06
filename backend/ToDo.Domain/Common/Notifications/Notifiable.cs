using System.Collections.ObjectModel;

namespace ToDo.Domain.Common.Notifications;

public abstract class Notifiable : INotifiable
{
    public void AddNotification(string errorMessage) => _notifications.Add(errorMessage);
    public void AddNotifications(IEnumerable<string> errors) => _notifications.AddRange(errors);
    
    private readonly List<string> _notifications = [];
    public ReadOnlyCollection<string> Notifications => _notifications.AsReadOnly();

    public bool IsValid => _notifications.Count == 0;
}