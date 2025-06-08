namespace ToDo.Application.Common.Results;

public record Result : IResult
{

    public Result()
    {
    }

    public Result(int statusCode, string message, object? data)
    {
        StatusCode = statusCode;
        Message = message;
        Data = data;
    }
    public bool Success => StatusCode is >= 200 and < 300;
    public string Message { get; init; } = string.Empty;
    public object? Data { get; set; }
    public int StatusCode { get; set; }
}

