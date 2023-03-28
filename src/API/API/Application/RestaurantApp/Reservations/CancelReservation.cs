using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Reservations
{
    public class CancelReservationCommand : IRequest<Unit>
    {
        public Guid ReservationId { get; set; }
        public string ReasonToCancel { get; set; }
    }

    public class CancelReservationCommandHandler : IRequestHandler<CancelReservationCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;

        public CancelReservationCommandHandler(IDocumentSession documentSession, ISendEmail sendGridEmailSender, IConfiguration configuration)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
        }
        public async Task<Unit> Handle(CancelReservationCommand request, CancellationToken cancellationToken)
        {
            var reservation = await _documentSession.Query<Reservation>().FirstOrDefaultAsync(r => r.Id == request.ReservationId);
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == reservation.RestaurantId);
            if ( reservation != null && restaurant != null)
            {
                reservation.Cancel(request.ReasonToCancel);
                _documentSession.Update(reservation);

                _documentSession.SaveChanges();

                await SendEmailCancellationToClientAsync(reservation, restaurant);
            }

            return Unit.Value;

        }

        private async Task SendEmailCancellationToClientAsync(Reservation reservation, Restaurant restaurant)
        {
            var data = new
            {
                ReservationLastname = reservation.ReservatorLastname,
                ReservationFirstname = reservation.ReservatorFirstname,
                ReservationDate = reservation.ReservationDate.ToString("dd/MM/yyy"),
                ReasonToCancel = reservation.ReasonToCancel,
                RestaurantName = restaurant.Name,
                RestaurantAddress = restaurant.Address
            };
            await _sendGridEmailSender.SendAsync(reservation.ReservatorEmail, _configuration["SendGrid:CancellationReservationTemplateId"], data);

        }
    }
}
