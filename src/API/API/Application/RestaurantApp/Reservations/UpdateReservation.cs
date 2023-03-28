using Marten;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Application.Common;
using static API.Domain.Reservation;
using Microsoft.Extensions.Configuration;

namespace API.Application.Reservations
{
    public class UpdateReservationCommand : IRequest<Unit>
    {
        public Guid RestaurantId { get; set; }
        public Guid Id { get; set; }
        public string ReservatorEmail { get; set; }
        public string ReservatorPhoneNumber { get; set; }
        public string ReservatorFirstname { get; set; }
        public string ReservatorLastname { get; set; }
        public DateTime ReservationDate { get; set; }
        public string ReservationTime { get; set; }
        public int NumberOfPlaces { get; set; }
    }
    public class UpdateReservationCommandHandler : IRequestHandler<UpdateReservationCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IProvideDate _provideDate;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;
        public UpdateReservationCommandHandler(IDocumentSession documentSession, IProvideDate provideDate, ISendEmail sendGridEmailSender, IConfiguration configuration)
        {
            _documentSession = documentSession;
            _provideDate = provideDate;
            _sendGridEmailSender = sendGridEmailSender;
            _configuration = configuration;
        }

        public async Task<Unit> Handle(UpdateReservationCommand request, CancellationToken cancellationToken)
        {
            var reservation = await _documentSession.Query<Reservation>().FirstOrDefaultAsync(r => r.RestaurantId == request.RestaurantId && r.Id == request.Id);
            
            var utcNow = _provideDate.UtcNow();
            var dc = reservation.ReservationDate - utcNow;

            if (dc.Days > 0)
            {
                reservation.Update(request.ReservatorEmail, request.ReservatorPhoneNumber, request.ReservatorFirstname, request.ReservatorLastname,
                     request.ReservationDate, request.ReservationTime, request.NumberOfPlaces);

                if (reservation.ReservationStatus.GetHashCode() == 1)
                {
                    reservation.ReservationStatus = Status.InProgress;
                }
                var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == reservation.RestaurantId);

                await SendEmailToRestaurantAsync(reservation, restaurant);

            }

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }

        private async Task SendEmailToRestaurantAsync(Reservation reservation, Restaurant restaurant)
        {
            var data = new
            {
                RestaurantName = restaurant.Name,
                ReservationDate = reservation.ReservationDate.ToString("dd/MM/yyy"),
                ReservationTime = reservation.ReservationTime
            };
            await _sendGridEmailSender.SendAsync(restaurant.Contact.Email, _configuration["SendGrid:SendUpdateReservationToRestaurantTemplateId"], data);
        }

    }
}
