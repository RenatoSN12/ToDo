namespace ToDo.Api;

public static class ApiConfiguration
{
    public static string ConnectionString { get; set; } = string.Empty;

    public static SecretsConfiguration Secrets { get; set; } = new();
    public class SecretsConfiguration
    {
        public string ApiKey { get; set; } = "ASD3287SDJ#%$&*@932JNSAD91#@!(&*";
        public string JwtPrivateKey { get; set; } = "ASD3287SDJ#%$&*@932JNSAD91#@!(&*";
    }
}