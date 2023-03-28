using API.Application.Commissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("/commissions")]
    public class CommissionsController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;
        public CommissionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCommissions()
        {
            var comissions = await Mediator.Send(new GetCommissionsQuery());
            return Ok(comissions);
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        public async Task<IActionResult> PostCommission(CreateCommissionCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Mediator.Send(command);
            return Ok();
        }
    }
}
