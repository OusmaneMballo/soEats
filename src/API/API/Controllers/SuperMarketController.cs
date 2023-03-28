using API.Application.SuperMarketApp.SuperMarkets;
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
    [Route("supermarkets")]
    public class SuperMarketController : ApiControllerBase
    {
        private readonly IConfiguration configuration;

        public SuperMarketController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetSuperMarket()
        {
            var superMarkets = await Mediator.Send(new GetSuperMarketsQuery { });
            return Ok(superMarkets);
        }

        [HttpGet("{ownerId}/supermaketManager/")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> GetSuperMarketByOwnerId(Guid ownerId)
        {
            ownerId = GetUserId();
            var superMarkets = await Mediator.Send(new GetSuperMarketsQuery { OwnerId = ownerId });
            return Ok(superMarkets);
        }

        [HttpGet("{slugId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSuperMarketBySlugId(string slugId)
        {
            var superMarket = await Mediator.Send(new GetSuperMarketBySlugIdQuery { SlugId = slugId });

            return Ok(superMarket);
        }

        [HttpDelete("{Id}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> DeleteSuperMarket(Guid Id)
        {
            var ownerId = GetUserId();
            try
            {
                await Mediator.Send(new DeleteSuperMarketCommand { RestaurateurId = ownerId, SuperMarketId = Id });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> GetSuperMarketById(Guid id)
        {
            var ownerId = GetUserId();
            var superMarket = await Mediator.Send(new GetSuperMarketByIdQuery {ManagerId = ownerId, IdSuperMarket = id });

            return Ok(superMarket);
        }

        [HttpPost]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> CreateSuperMarket(CreateSuperMarketCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{Id}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UpdateSuperMarket(Guid Id, UpdateSuperMarketCommand command)
        {
            if (Id != command.SuperMarketId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        

        [HttpPut("{id:guid}/openinghours")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> SetOrUpdateOpeningHour(Guid id, [FromBody] SetOpeningHoursCommand openingHourCommand)
        {
            var ownerId = GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            openingHourCommand.SuperMarketId = id;

            await Mediator.Send(openingHourCommand);

            return Ok();
        }

        [HttpPost("{id:guid}/image")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UploadSuperMarketImage(Guid id, IFormFile file)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var imageUrl = await Mediator.Send(new UploadImageCommand { RestaurateurId = ownerId, SuperMarketId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPost("{id:guid}/photos")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UploadPhoto(Guid id, IFormFile file)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UploadPhotoCommand { RestaurateurId = ownerId, SuperMarketId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
                    return Ok(new { photoId = imageId, photoUrl = imageUrl });
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

        [HttpPut("{id:guid}/photos/{photoId:guid}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UploadPhoto(Guid id, IFormFile file, Guid photoId)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UpdatePhotoCommand { RestaurateurId = ownerId, SuperMerketId = id, PhotoId = photoId, FileName = file.FileName, ImageFile = file.OpenReadStream() });
                    return Ok(new { photoId = imageId, photoUrl = imageUrl });
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

        [HttpDelete("{id:guid}/photos/{photoId:guid}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> DeletePhoto(Guid id, Guid photoId)
        {
            var ownerId = GetUserId();
            try
            {
                if (id == Guid.Empty && photoId == Guid.Empty)
                {
                    await Mediator.Send(new DeletePhotoCommand { RestaurateurId = ownerId, SuperMarketId = id, PhotoId = photoId });
                    return NoContent();
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
