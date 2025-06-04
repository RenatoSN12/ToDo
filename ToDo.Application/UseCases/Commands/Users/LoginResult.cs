
using System.Text.Json.Serialization;

namespace ToDo.Application.UseCases.Commands.Users;

public record LoginResult : Result
{
    [JsonIgnore]
    public JwtData? JwtData { get; init; }
    
    public LoginResult( int StatusCode, string Message) : base(StatusCode,Message, null)
    {
        JwtData = null;
    }

    public LoginResult(JwtData data) : base(200, "", null)
    {
        JwtData = data;
    }
}

public class JwtData
{
    public string Token { get; set; } = string.Empty;
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}