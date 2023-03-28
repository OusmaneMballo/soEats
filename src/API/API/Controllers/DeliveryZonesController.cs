using API.Application.DeliveryZones;
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
    [Route("/deliveryZone")]
    public class DeliveryZonesController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;
        public DeliveryZonesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetDeliveryZones()
        {
            var deliveryZones = await Mediator.Send(new GetDeliveryZonesQuery());
            return Ok(deliveryZones);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostDeliveryZone(CreateDeliveryZoneCommand command)
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
