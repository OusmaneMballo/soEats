using API.Models.Share;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("roles")]
    public class RolesController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public RolesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize(Roles = "Restaurateur,SuperMarketManager")]
        public OkObjectResult GetRoleUser()
        {
            var role = HttpContext.User.FindFirst("role")?.Value;
            return Ok(new RoleDto(role));
        }
    }
}
