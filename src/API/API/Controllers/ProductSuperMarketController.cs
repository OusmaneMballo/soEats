using API.Application.SuperMarketApp.Sections.Products;
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
    [Route("superMarket/{superMarketId:guid}")]
    public class ProductSuperMarketController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductSuperMarketController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("products")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> GetProducts(Guid superMarketId)
        {
            var products = await Mediator.Send(new GetProductsByIdSuperMarketQuery { IdSuperMarket = superMarketId });

            if (products == null)
                return NotFound();

            return Ok(products);
        }

        [HttpGet("{sectionId:guid}/products")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSectionProducts(Guid superMarketId, Guid sectionId)
        {
            var products = await Mediator.Send(new GetProductByIdSuperMarketAndByIdSectionQuery { IdSuperMarket = superMarketId, IdSection = sectionId });

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }

        [HttpPost]
        [Authorize( Roles = "SuperMarketManager")]
        public async Task<IActionResult> CreateProduct(Guid superMarketId, [FromForm]CreateProductCommand command)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                if (command.File.Length > 0 && IsImage(command.File))
                {
                    var productId = await Mediator.Send(command);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPut("{productId}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UpdateProduct(Guid superMarketId, Guid productId, [FromForm] UpdateProductCommand command)
        {
            if (superMarketId != command.SuperMarketId || productId != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{sectionId:guid}/{productId:guid}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> deleteProduct(Guid superMarketId, Guid sectionId, Guid productId)
        {
            try
            {
                await Mediator.Send(new DeleteProductCommand { SuperMarketId = superMarketId, SectionId = sectionId, ProductId = productId });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


    }
}
