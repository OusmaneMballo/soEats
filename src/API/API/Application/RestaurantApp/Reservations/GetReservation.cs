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
    public class GetReservationQuery : IRequest<ReservationDto>
    {
        public Guid ReservationId { get; set; }

    }

    public class GetReservationQueryHandler : IRequestHandler<GetReservationQuery, ReservationDto>
    {
        private readonly IQuerySession _querySession;
        public GetReservationQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;

        }
        public async Task<ReservationDto> Handle(GetReservationQuery request, CancellationToken cancellationToken)
        {
            var reservation = await _querySession.Query<Reservation>().FirstOrDefaultAsync(r => r.Id == request.ReservationId);
            if (reservation == null)
                return null;

            return reservation.ProjectToReservationDto();
        }
    }
}
