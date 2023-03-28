using API.Application.Orders;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("restaurants/{restaurantId}/orders")]
    [AllowAnonymous]
    public class OrdersController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrdersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders(Guid restaurantId)
        {
            return Ok(await Mediator.Send(new GetOrdersByRestaurantIdQuery { RestaurantId = restaurantId }));
        }

        [HttpGet("{orderId:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetOrderById(Guid restaurantId, Guid orderId)
        {
            var order = await Mediator.Send(new GetOrderByIdQuery { RestaurantId = restaurantId, OrderId = orderId });
            return Ok(order);
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmOrder(Guid id, ConfirmOrderCommand command)
        {
            if (id != command.OrderId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut("{id}/annuler")]
        [AllowAnonymous]
        public async Task<IActionResult> CancelOrder(Guid id, CancelOrderCommand command)
        {
            if (id != command.OrderId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateOrder(Guid restaurantId, CreateOrderCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderId = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetOrderById), new { restaurantId = restaurantId, orderId = orderId }, null);
        }
    }
}

