using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Domain;
using API.Application.Reservations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("restaurants/{restaurantId}/reservations")]
    public class ReservationsController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public ReservationsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize(Roles = "Restaurateur")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations(Guid restaurantId)
        {
            return Ok(await Mediator.Send(new GetReservationsByIdRestaurantQuery {RestaurantId = restaurantId }));
        }

        [HttpGet("/edit/{reservationId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetReservation(Guid reservationId)
        {
            var reservation = await Mediator.Send(new GetReservationQuery { ReservationId = reservationId});

            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        [HttpGet("{reservationId}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> GetReservationById(Guid restaurantId, Guid reservationId)
        {
            var reservation = await Mediator.Send(new GetReservationByIdQuery { ReservationId = reservationId, RestaurantId = restaurantId });

            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        [HttpPut("{id}/update")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateReservation(Guid restaurantId, Guid id, UpdateReservationCommand command)
        {
            if (restaurantId != command.RestaurantId && id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> ConfirmReservation(Guid id, ConfirmReservationCommand command)
        {
            if (id != command.ReservationId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut("{id}/annuler")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<IActionResult> CancelReservation(Guid id, CancelReservationCommand command)
        {
            if (id != command.ReservationId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            return NoContent();
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostReservation(Guid restaurantId, CreateReservationCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reservationId = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetReservationById), new {restaurantId = restaurantId, reservationId = reservationId }, null);
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteReservation(Guid restaurantId, Guid id)
        {

            try
            {
                await Mediator.Send(new DeleteReservationCommand { RestaurantId = restaurantId, Id = id });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
