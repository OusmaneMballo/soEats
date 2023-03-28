using System;
using System.Threading.Tasks;
using API.Application.Cards;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("restaurants/{restaurantId}/cards")]
    [AllowAnonymous]
    public class CardsController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public CardsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCardById(Guid restaurantId)
        {
            var card = await Mediator.Send(new GetCardByIdQuery { RestaurantId = restaurantId });

            if (card == null)
                return NotFound();

            return Ok(card);
        }


    }
}
