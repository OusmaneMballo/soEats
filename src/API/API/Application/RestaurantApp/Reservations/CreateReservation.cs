using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Common;
using API.Domain;
using API.Infrastructure;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace API.Application.Reservations
{
    public class CreateReservationCommand : IRequest<Guid>
    {
        [Required]
        public Guid RestaurantId { get; set; }

        [Required]
        public string ReservatorEmail { get; set; }

        [Required]
        public string ReservatorPhoneNumber { get;  set; }

        [Required]
        public string ReservatorFirstname { get; set; }

        [Required]
        public string ReservatorLastname { get; set; }

        [Required]
        public DateTime ReservationDate { get; set; }

        [Required]
        public string ReservationTime { get; set; }

        [Required]
        public int NumberOfPlaces { get; set; }
    }

    public class CreateReservationCommonHandler : IRequestHandler<CreateReservationCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;

        public CreateReservationCommonHandler(IDocumentSession documentSession, ISendEmail sendGridEmailSender, IConfiguration configuration)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
        }
        public async Task<Guid> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
        {
            var reservationId = Guid.NewGuid();
            var restaurantId = request.RestaurantId;
            var reservation = new Reservation(
                                                reservationId,
                                                restaurantId,
                                                request.ReservatorEmail,
                                                request.ReservatorPhoneNumber,
                                                request.ReservatorFirstname,
                                                request.ReservatorLastname,
                                                request.ReservationDate,
                                                request.ReservationTime,
                                                request.NumberOfPlaces);

             _documentSession.Store(reservation);
             await _documentSession.SaveChangesAsync();

            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId);

            if (restaurant != null)
            {
                await SendEmailToClientAsync(reservation, restaurant);
                await SendEmailToRestaurantAsync(reservation, restaurant);
            }

            return reservationId;
        }

        private async Task SendEmailToClientAsync(Reservation reservation, Restaurant restaurant)
        {
            var data = new
            {
                ReservationLastname = reservation.ReservatorLastname,
                ReservationFirstname = reservation.ReservatorFirstname,
                ReservationDate = reservation.ReservationDate.ToString("dd/MM/yyy"),
                RestaurantName = restaurant.Name,
                RestaurantAddress = restaurant.Address,
                SlugId = restaurant.SlugId,
                ReservationId = reservation.Id
            };
           await _sendGridEmailSender.SendAsync(reservation.ReservatorEmail, _configuration["SendGrid:DemandeReservationTemplateId"], data);
        }

        private async Task SendEmailToRestaurantAsync(Reservation reservation, Restaurant restaurant)
        {
            var data = new
            {
                RestaurantName = restaurant.Name,
                ReservationDate = reservation.ReservationDate.ToString("dd/MM/yyy"),
                ReservationTime = reservation.ReservationTime
            };
            await _sendGridEmailSender.SendAsync(restaurant.Contact.Email, _configuration["SendGrid:SendReservationToRestaurantTemplateId"], data);
        }
    }
}
