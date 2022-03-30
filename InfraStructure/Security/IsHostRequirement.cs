using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;


namespace InfraStructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

   
}
