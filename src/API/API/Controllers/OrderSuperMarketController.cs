using API.Application.SuperMarketApp.Orders;
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
    [Route("supermarket/{superMarketId}")]
    public class OrderSuperMarketController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrderSuperMarketController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("orders")]
        [Authorize( Roles= "SuperMarketManager")]
        public async Task<IActionResult> GetOrders(Guid superMarketId)
        {
            return Ok(await Mediator.Send(new GetOrdersByIdSuperMarketQuery { IdSuperMarket = superMarketId }));
        }

        [HttpGet("order/{ordertId:guid}")]
        public async Task<IActionResult> GetOrdersById(Guid superMarketId, Guid ordertId)
        {
            return Ok(await Mediator.Send(new GetOrdersByIdQuery { IdSuperMarket = superMarketId, IdOrder = ordertId }));
        }

        [HttpPost("order")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateOrder(Guid superMarketId, CreateOrderCommand command)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{ordertId:guid}/confirm")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> ConfirmOrder(Guid superMarketId, Guid ordertId)
        {
            return Ok(await Mediator.Send(new ConfirmOrderCommand { IdSuperMarket = superMarketId, IdOrder = ordertId }));
        }

        [HttpPut("{ordertId:guid}/cancel")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> CancelOrder(Guid superMarketId, Guid ordertId)
        {
            return Ok(await Mediator.Send(new CancelOrderCommand { IdSuperMarket = superMarketId, IdOrder = ordertId }));
        }
    }
}
