using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using API.Application.Cards.Products;
using Microsoft.AspNetCore.Http;
using API.Domain;

namespace API.Controllers
{
    [Route("cards/{cardId}/products")]
    public class ProductsController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts( Guid cardId)
        {
            var products = await Mediator.Send(new GetProductsQuery { CardId = cardId });
            return Ok(products);
        }

        // GET: api/Produits/5
        [HttpGet("{productId:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductById(Guid cardId,Guid productId)
        {
            var product = await Mediator.Send(new GetProductByIdQuery { CardId = cardId , ProductId = productId });

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> CreateProduct(Guid cardId, [FromForm]CreateProductCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                if (command.File.Length > 0 && IsImage(command.File))
                {
                    var productId = await Mediator.Send(command);
                    return CreatedAtAction(nameof(GetProductById), new { cardId = cardId, productId = productId }, null);
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

        [HttpDelete("{productId:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> DeleteProduct(Guid cardId, Guid productId)
        {
           
            try
            {
                await Mediator.Send(new DeleteProductFromCardCommand { CardId = cardId, ProductId = productId });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }

        [HttpPut("{productId}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UpdateProduct(Guid cardId, Guid productId, [FromForm]UpdateProductCommand command)
        {
            if (cardId != command.CardId || productId != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut()]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> BulkUpdateProduct(Guid cardId, [FromBody] BulkUpdateProductCommand command)
        {
            if (cardId != command.CardId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPost("{id:guid}/image")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UploadProductImage(Guid cardId, Guid id, IFormFile file)
        {
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var imageUrl = await Mediator.Send(new UploadProductImageCommand { CardId = cardId, ProductId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
                    return Ok(new { imageUrl });
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

    }
}
