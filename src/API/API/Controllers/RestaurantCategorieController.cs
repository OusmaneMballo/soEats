using API.Application.RestaurantCategories;
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

    [Route("/restaurants/categories")]
    public class RestaurantCategorieController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;
        public RestaurantCategorieController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetRestaurantCategory()
        {
            var restaurantCategories = await Mediator.Send(new GetRestaurantCategoriesQuery());
            return Ok(restaurantCategories);
        }

        [HttpPost]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> PostRestaurantCategory([FromForm] CreateRestaurantCategorieCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Mediator.Send(command);
            return Ok();
        }

        [HttpPut("{restaurantCategorieId}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UpdateProduct(Guid restaurantCategorieId, [FromForm] UpdateRestaurantCategorieCommand command)
        {
            if (restaurantCategorieId != command.Id && !IsImage(command.File))
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }
    }
}
