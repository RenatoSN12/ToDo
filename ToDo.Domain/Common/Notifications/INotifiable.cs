namespace ToDo.Domain.Common.Notifications;

public interface INotifiable
{
    public void AddNotification(string errorMessage);
}