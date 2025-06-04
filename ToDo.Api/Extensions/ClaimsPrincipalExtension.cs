using System.Security.Claims;

namespace ToDo.Api.Extensions;

public static class ClaimsPrincipalExtension
{
    public static string GetEmail(this ClaimsPrincipal principal) 
        => principal.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
}