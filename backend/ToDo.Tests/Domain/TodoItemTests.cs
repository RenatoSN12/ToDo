using ToDo.Domain.Common.Extensions;
using ToDo.Domain.Entities;

namespace ToDo.Tests.Domain;

[TestClass]
public class TodoItemTests
{
    private static TodoItem CreateValidTask() 
        => new("emailteste@gmail.com", "titulo-teste", DateTime.Now.AddDays(5).ToDateOnly(), "Descrição da Task");
    
    [TestMethod]
    [TestCategory("Domain")]
    public void Complete_Task_Should_Mark_As_Completed()
    {
        var task = CreateValidTask();
        task.Complete();
        
        Assert.IsTrue(task.IsCompleted);
        Assert.IsNotNull(task.CompletedAt);
        Assert.IsTrue(task.IsValid);
    }

    [TestMethod]
    [TestCategory("Domain")]
    public void Complete_Should_Catch_Error_When_Task_Is_Already_Completed()
    {
        var task = CreateValidTask();
        task.Complete();
        task.Complete();
        
        Assert.IsFalse(task.IsValid);
        Assert.IsTrue(task.IsCompleted);
        Assert.IsNotNull(task.CompletedAt);
    }

    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Not_Change_Task_Title_When_Task_Is_Completed()
    {
        var task = CreateValidTask();
        task.Complete();

        const string newTitle = "Novo titulo";
        
        task.ChangeTitle(newTitle);
        
        Assert.IsFalse(task.IsValid);
        Assert.AreNotEqual(newTitle,task.Title);
    }

    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Change_Title_With_Success()
    {
        var task = CreateValidTask();
        
        const string newTitle = "Novo titulo";
        
        task.ChangeTitle(newTitle);
        
        Assert.IsTrue(task.IsValid);
        Assert.AreEqual(newTitle, task.Title);
    }
    
    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Not_Change_Task_Description_When_Task_Is_Completed()
    {
        var task = CreateValidTask();
        task.Complete();

        const string newDescription = "Nova descrição";
        
        task.ChangeDescription(newDescription);
        
        Assert.IsFalse(task.IsValid);
        Assert.AreNotEqual(newDescription,task.Description);
    }
    
    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Change_Description_With_Success()
    {
        var task = CreateValidTask();

        const string newDescription = "Nova descrição";
        
        task.ChangeDescription(newDescription);
        
        Assert.IsTrue(task.IsValid);
        Assert.AreEqual(newDescription,task.Description);
    }

    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Not_Change_Task_Due_Date_When_Task_Is_Completed()
    {
        var task = CreateValidTask();
        task.Complete();
        
        var dueDate = DateTime.Now.AddDays(10).ToDateOnly();
        
        task.ChangeDueDate(dueDate);
        Assert.IsFalse(task.IsValid);
        Assert.AreNotEqual(dueDate,task.DueDate);
    }

    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Not_Change_Task_Due_Date_When_It_Is_The_Past()
    {
        var task = CreateValidTask();
        var dueDate = DateTime.Now.AddDays(-1).ToDateOnly();
        
        task.ChangeDueDate(dueDate);
        Assert.IsFalse(task.IsValid);
        Assert.AreNotEqual(dueDate,task.DueDate);
    }
    
    [TestMethod]
    [TestCategory("Domain")]
    public void Should_Change_Due_Date_With_Success()
    {
        var task = CreateValidTask();

        var dueDate = DateTime.Now.AddDays(7).ToDateOnly();
        
        task.ChangeDueDate(dueDate);
        
        Assert.IsTrue(task.IsValid);
        Assert.AreEqual(dueDate,task.DueDate);
    }
}