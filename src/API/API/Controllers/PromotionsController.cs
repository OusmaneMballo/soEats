using API.Application.Promotions;
using API.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("promotions")]
    [Authorize(Roles = "Restaurateur")]
    public class PromotionsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreatePromotion([FromForm] CreatePromotionCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await Mediator.Send(command);
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetPromotions()
        {
            var promotions = await Mediator.Send(new GetPromotionsQuery { });
            return Ok(promotions);
        }

        [HttpGet("{restaurantId}")]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetPromotionsByRestaurantId(Guid restaurantId)
        {
            return Ok(await Mediator.Send(new GetPromotionByRestaurantIdQuery { RestaurantId = restaurantId }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePromotion(Guid id,Guid restaurantId,  UpdatePromotionCommand command)
        {
            if (id != command.Id && restaurantId != command.RestaurantId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{restaurantId}/{id}")]
        public async Task<IActionResult> DeletePromotion(Guid id, Guid restaurantId)
        {
            try
            {
                await Mediator.Send(new DeletePromotionCommand { PromotionId = id, RestaurantId = restaurantId });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
