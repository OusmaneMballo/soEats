using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.DeliveryZones
{
    public class GetDeliveryZonesQuery : IRequest<IEnumerable<DeliveryZoneDto>>
    {
    }
    public class GetDeliveryZonesQueryHandler : IRequestHandler<GetDeliveryZonesQuery, IEnumerable<DeliveryZoneDto>>
    {
        private readonly IQuerySession _querySession;

        public GetDeliveryZonesQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<DeliveryZoneDto>> Handle(GetDeliveryZonesQuery request, CancellationToken cancellationToken)
        {
            return (await _querySession.Query<DeliveryZone>()
                                       .ToListAsync())
                                       .Select(dz => dz.ProjectToDeliveryZoneDto());
        }
    }
}
