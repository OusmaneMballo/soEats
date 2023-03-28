using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using API.Application.Cards.Products;
using API.Application.Cards.Menus;

namespace API.Controllers
{
    [Route("cards/{cardId}/menus")]
    public class MenusController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public MenusController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetMenus(Guid cardId)
        {
            return Ok(await Mediator.Send(new GetMenusQuery { CardId = cardId }));
        }

        [HttpGet("{menuId:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMenuById(Guid cardId, Guid menuId)
        {
            var menus = await Mediator.Send(new GetMenuWithProductsQuery { CardId = cardId, MenuId = menuId });
            return Ok(menus);
        }

        [HttpPost]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> CreateMenu(Guid cardId, [FromForm]CreateMenuCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (command.File.Length > 0 && IsImage(command.File))
                {
                    var menuId = await Mediator.Send(command);
                    return CreatedAtAction(nameof(GetMenuById), new { cardId = cardId, menuId = menuId }, null);
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

        [HttpPost("{menuid:guid}/{productId:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> AddProductToMenu(Guid menuid, Guid productId, AddProductsToMenuCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{menuId:guid}/{productId:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> DeleteProduct(Guid cardId, Guid menuId, Guid productId)
        {
            try
            {
                await Mediator.Send(new DeleteProductFromMenuCommand { CardId = cardId, MenuId = menuId, ProductId = productId });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        
        [HttpDelete("{menuId:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> DeleteMenu(Guid cardId, Guid menuId)
        {
            try
            {
                await Mediator.Send(new DeleteMenuCommand { CardId = cardId, MenuId = menuId });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPut("{menuId}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UpdateMenu(Guid cardId, Guid menuId, [FromForm] UpdateMenuCommand command)
        {
            if (cardId != command.CardId || menuId != command.MenuId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPost("{id:guid}/image")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UploadMenuImage(Guid cardId, Guid id, IFormFile file)
        {
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var imageUrl = await Mediator.Send(new UploadMenuImageCommand { CardId = cardId , MenuId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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
