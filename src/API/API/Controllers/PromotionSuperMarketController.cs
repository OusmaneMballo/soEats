using API.Application.SuperMarketApp.Promotions;
using API.Domain.SuperMarkets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("superMarket")]
    [Authorize(Roles = "SuperMarketManager")]
    public class PromotionSuperMarketController : ApiControllerBase
    {
        [HttpPost("promotion")]
        public async Task<IActionResult> CreatePromotion([FromForm] CreatePromotionCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await Mediator.Send(command);
            return Ok();
        }

        [HttpGet("promotions")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPromotions()
        {
            var promotions = await Mediator.Send(new GetPromotionsQuery { });
            return Ok(promotions);
        }

        [HttpGet("{superMarketId}/promotions")]
        public async Task<ActionResult<IEnumerable<PromotionSuperMarket>>> GetPromotionsBySuperMarketId(Guid superMarketId)
        {
            return Ok(await Mediator.Send(new GetPromotionsByIdSuperMarketQuery { IdSuperMarket = superMarketId }));
        }

        [HttpPut("{SuperMarketId:guid}/promotion/{id}")]
        public async Task<IActionResult> UpdatePromotion(Guid id, Guid SuperMarketId, UpdatePromotionCommand command)
        {
            if (id != command.Id && SuperMarketId != command.SuperMarketId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{superMarketId}/promotion/{id}")]
        public async Task<IActionResult> DeletePromotion(Guid id, Guid superMarketId)
        {
            try
            {
                await Mediator.Send(new DeletePromotionCommand { PromotionId = id, SuperMarketId = superMarketId });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
