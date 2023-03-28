using API.Domain;
using API.Infrastructure;
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
    public class GetReservationsByIdRestaurantQuery : IRequest<IEnumerable<ReservationDto>>
    {
        public Guid RestaurantId { get; set; }
    }

    public class GetReservationsByIdRestaurantQueryHandler : IRequestHandler<GetReservationsByIdRestaurantQuery, IEnumerable<ReservationDto>>
    {
        private readonly IQuerySession _querySession;


        public GetReservationsByIdRestaurantQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<ReservationDto>> Handle(GetReservationsByIdRestaurantQuery request, CancellationToken cancellationToken)
        {
            if (request.RestaurantId == Guid.Empty)
            {
                return null; 
            }
            return (await _querySession.Query<Reservation>()
                                          .Where(r => r.RestaurantId == request.RestaurantId)
                                          .ToListAsync())
                                          .Select(r => r.ProjectToReservationDto());
        }

    }
}
