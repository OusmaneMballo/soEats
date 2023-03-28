using System;
using System.IO;
using System.Threading.Tasks;
using API.Application.Restaurants;
using API.Application.Share;
using API.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("restaurants")]
    public class RestaurantsController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public RestaurantsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetRestaurants()
        {
            var restaurants = await Mediator.Send(new GetRestaurantsQuery { });
            return Ok(restaurants);
        }

        [HttpGet("clients")]
        [AllowAnonymous]
        public async Task<IActionResult> GetClients()
        {
            var clients = await Mediator.Send(new GetClientsQuery { });
            return Ok(clients);
        }

        [HttpGet("{ownerId}/restaurants/")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> GetRestaurantByOwnerId(Guid ownerId)
        {
        
            ownerId = GetUserId();
            var restaurants = await Mediator.Send(new GetRestaurantsQuery { OwnerId = ownerId });
            return Ok(restaurants);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> GetRestaurantById(Guid id)
        {
            var ownerId = GetUserId();
            var restaurant = await Mediator.Send(new GetRestaurantByIdQuery {RestaurateurId = ownerId,  RestaurantId = id });

            if (restaurant == null)
                return NotFound();

            return Ok(restaurant);
        }

        [HttpGet("{slugId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRestaurantBySlugId(string slugId)
        {
            var restaurant = await Mediator.Send(new GetRestaurantBySlugIdQuery { SlugId = slugId });

            return Ok(restaurant);
        }

        [HttpPost]
        [Authorize(Roles ="Restaurateur")]
        public async Task<IActionResult> CreateRestaurant(CreateRestaurantCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            command.OwnerId = GetUserId();
            if (command.OwnerId != Guid.Empty)
            {
                var restaurantId = await Mediator.Send(command);
                return CreatedAtAction(nameof(GetRestaurantById), new { id = restaurantId }, null);

            }
            return BadRequest();

        }

        [HttpPut("{restaurantId}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UpdateRestaurant(Guid restaurantId, UpdateRestaurantCommand command)
        {
            if (restaurantId != command.RestaurantId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> DeleteRestaurant(Guid id)
        {
            var ownerId = GetUserId();
            try
            {
                await Mediator.Send(new DeleteRestaurantCommand { RestaurateurId = ownerId, RestaurantId = id});
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete("{id:guid}/photos/{photoId:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> DeletePhoto(Guid id, Guid photoId)
        {
            var ownerId = GetUserId();
            try
            {
                if (id == Guid.Empty && photoId == Guid.Empty)
                {
                    await Mediator.Send(new DeletePhotoCommand { RestaurateurId = ownerId, RestaurantId = id, PhotoId = photoId });
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

        [HttpPost("{id:guid}/image")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UploadRestaurantImage(Guid id, IFormFile file)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var imageUrl = await Mediator.Send(new UploadImageCommand { RestaurateurId = ownerId, RestaurantId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPost("{id:guid}/menuImages")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UploadMenuImage(Guid id, IFormFile file)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UploadMenuImageCommand { RestaurateurId = ownerId, RestaurantId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
                    return Ok(new { menuImageId = imageId, menuImageUrl = imageUrl });
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
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UploadPhoto(Guid id, IFormFile file)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UploadPhotoCommand { RestaurateurId = ownerId, RestaurantId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> UploadPhoto(Guid id, IFormFile file, Guid photoId)
        {
            var ownerId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UpdatePhotoCommand { RestaurateurId = ownerId, RestaurantId = id, PhotoId = photoId, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPut("{id:guid}/openinghours")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> SetOrUpdateOpeningHour(Guid id, [FromBody] SetOpeningHoursCommand openingHourCommand)
        {
            var ownerId = GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            openingHourCommand.RestaurantId = id;
            openingHourCommand.RestaurateurId = ownerId;

            await Mediator.Send(openingHourCommand);

            return Ok();
        }
    }
}
