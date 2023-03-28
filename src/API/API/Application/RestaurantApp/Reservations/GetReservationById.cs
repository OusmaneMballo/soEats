using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Reservations
{
    public class GetReservationByIdQuery : IRequest<ReservationDto>
    {
        public Guid ReservationId { get; set; }
        public Guid RestaurantId { get; set; }

    }

    public class GetReservationByIdQueryHandler : IRequestHandler<GetReservationByIdQuery, ReservationDto>
    {
        private readonly IQuerySession _querySession;
        public GetReservationByIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;

        }
        public async Task<ReservationDto> Handle(GetReservationByIdQuery request, CancellationToken cancellationToken)
        {
            var reservation = await _querySession.Query<Reservation>().FirstOrDefaultAsync(r=> r.Id == request.ReservationId && r.RestaurantId == request.RestaurantId);
            if (reservation == null)
                return null;

            return  reservation.ProjectToReservationDto();
        }
    }
     
}
