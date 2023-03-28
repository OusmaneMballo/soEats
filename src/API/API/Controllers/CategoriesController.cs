using API.Application.SuperMarketApp.Categores;
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
    [Route("supermarket/category")]
    public class CategoriesController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public CategoriesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await Mediator.Send(new GetCategoryQuery());
            return Ok(categories);
        }

        [HttpGet("{categoryId:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCategoryById(Guid categoryId)
        {
            var category = await Mediator.Send(new GetCategoryByIdQuery { CategoryId = categoryId });

            return Ok(category);
        }

        [HttpPost]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> PostCategory(CreateCategoryCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Mediator.Send(command);
            return Ok();
        }

        [HttpPut("{Id}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UpdateCategory(Guid Id, UpdateCategoryCommand command)
        {
            if (Id != command.IdCategory)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{Id}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> DeleteCategory(Guid Id)
        {
            try
            {
                await Mediator.Send(new DeleteCategoryCommand { IdCategory = Id });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
