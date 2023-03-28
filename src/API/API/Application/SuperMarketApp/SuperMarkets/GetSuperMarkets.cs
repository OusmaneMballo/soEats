using API.Application.Photos;
using API.Domain.SuperMarkets;
using API.Models;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class GetSuperMarketsQuery : IRequest<IEnumerable<SuperMarketDto>>
    {
        public Guid OwnerId { get; set; }
    }

    public class GetSuperMarketsQueryHandler : IRequestHandler<GetSuperMarketsQuery, IEnumerable<SuperMarketDto>>
    {
        private readonly IQuerySession _querySession;

        public GetSuperMarketsQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<SuperMarketDto>> Handle(GetSuperMarketsQuery request, CancellationToken cancellationToken)
        {
            if (request.OwnerId != Guid.Empty)
            {
                return (await _querySession.Query<SuperMarket>()
                .Where(s => s.OwnerId == request.OwnerId)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync())
                .Select(s => s.ProjectToSuperMarketDto());
            }

            return (await _querySession.Query<SuperMarket>()
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync())
                .Where(s => s.IsFullyConfigured())
                .Select(s => s.ProjectToSuperMarketDto());
        }
    }
}
