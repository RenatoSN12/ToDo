using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ToDo.Application.UseCases.Commands.Users;

namespace ToDo.Api.Extensions;

public static class JwtExtensions
{
    public static string GenerateJwtToken(JwtData data)
    {
        var handler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(ApiConfiguration.Secrets.JwtPrivateKey);
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature
        );

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = GenerateClaimsIdentity(data),
            Expires = DateTime.UtcNow.AddHours(8),
            SigningCredentials = credentials
        };
        
        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaimsIdentity(JwtData data)
    {
        var identity = new ClaimsIdentity();
        identity.AddClaim(new Claim("id", data.Id.ToString()));
        identity.AddClaim(new Claim(ClaimTypes.GivenName, data.Name));
        identity.AddClaim(new Claim(ClaimTypes.Email, data.Email));
        identity.AddClaim(new Claim(ClaimTypes.Name, data.Email));
        
        return identity;
    }
    
}