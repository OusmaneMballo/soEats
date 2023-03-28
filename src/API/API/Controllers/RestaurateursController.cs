using API.Application.Restaurants;
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
    [Route("restaurateurs/{restaurateurId}")]
    [Authorize(Roles = "Restaurateur")]
    public class RestaurateursController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public RestaurateursController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("restaurants")]
        public async Task<IActionResult> GetRestaurantByOwnerId(Guid restaurateurId)
        {
            restaurateurId = GetUserId();
            var restaurants = await Mediator.Send(new GetRestaurantsQuery { OwnerId = restaurateurId });
            return Ok(restaurants);
        }

        [HttpGet("restaurants/{id:guid}")]
        public async Task<IActionResult> GetRestaurantById(Guid restaurateurId, Guid id)
        {
            restaurateurId = GetUserId();
            var restaurant = await Mediator.Send(new GetRestaurantByIdQuery {RestaurateurId = restaurateurId, RestaurantId = id });

            if (restaurant == null)
                return NotFound();

            return Ok(restaurant);
        }

        [HttpPost]
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

        [HttpPut("restaurants/{id:guid}")]
        public async Task<IActionResult> UpdateRestaurant(Guid restaurateurId, Guid id, UpdateRestaurantCommand command)
        {
            restaurateurId = GetUserId();

            if (id != command.RestaurantId || restaurateurId != command.OwnerId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }


        [HttpDelete("restaurants/{id:guid}")]
        public async Task<IActionResult> DeleteRestaurant(Guid restaurateurId, Guid id)
        {
            restaurateurId = GetUserId();
            try
            {
                await Mediator.Send(new DeleteRestaurantCommand { RestaurateurId = restaurateurId , RestaurantId = id });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete("restaurants/{id:guid}/photos/{photoId:guid}")]
        public async Task<IActionResult> DeletePhoto(Guid restaurateurId, Guid id, Guid photoId)
        {
            restaurateurId = GetUserId();
            try
            {
                if (id == Guid.Empty && photoId == Guid.Empty)
                {
                    await Mediator.Send(new DeletePhotoCommand { RestaurateurId = restaurateurId, RestaurantId = id, PhotoId = photoId });
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

        [HttpPost("restaurants/{id:guid}/image")]
        public async Task<IActionResult> UploadRestaurantImage(Guid restaurateurId, Guid id, IFormFile file)
        {
            restaurateurId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var imageUrl = await Mediator.Send(new UploadImageCommand { RestaurateurId = restaurateurId, RestaurantId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPost("restaurants/{id:guid}/menuImages")]
        public async Task<IActionResult> UploadMenuImage(Guid restaurateurId, Guid id, IFormFile file)
        {
            restaurateurId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UploadMenuImageCommand { RestaurateurId = restaurateurId, RestaurantId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPost("restaurants/{id:guid}/photos")]
        public async Task<IActionResult> UploadPhoto(Guid restaurateurId, Guid id, IFormFile file)
        {
            restaurateurId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UploadPhotoCommand { RestaurateurId = restaurateurId, RestaurantId = id, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPut("restaurants/{id:guid}/photos/{photoId:guid}")]
        public async Task<IActionResult> UploadPhoto(Guid restaurateurId, Guid id, IFormFile file, Guid photoId)
        {
            restaurateurId = GetUserId();
            try
            {
                if (file.Length > 0 && IsImage(file))
                {
                    var (imageId, imageUrl) = await Mediator.Send(new UpdatePhotoCommand { RestaurateurId = restaurateurId, RestaurantId = id, PhotoId = photoId, FileName = file.FileName, ImageFile = file.OpenReadStream() });
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

        [HttpPut("restaurants/{id:guid}/openinghours")]
        public async Task<IActionResult> SetOrUpdateOpeningHour(Guid restaurateurId, Guid id, [FromBody] SetOpeningHoursCommand openingHourCommand)
        {
            restaurateurId = GetUserId();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            openingHourCommand.RestaurantId = id;
            openingHourCommand.RestaurateurId = restaurateurId;

            await Mediator.Send(openingHourCommand);

            return Ok();
        }

    }
}
