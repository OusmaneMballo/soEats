using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class GetSuperMarketByIdQuery : IRequest<SuperMarketDto>
    {
        public Guid ManagerId { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class GetSuperMarketByIdQueryHandler : IRequestHandler<GetSuperMarketByIdQuery, SuperMarketDto>
    {
        private readonly IQuerySession _querySession;

        public GetSuperMarketByIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<SuperMarketDto> Handle(GetSuperMarketByIdQuery request, CancellationToken cancellationToken)
        {
            var superMarket = await _querySession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.IdSuperMarket && s.OwnerId == request.ManagerId);

            return superMarket.ProjectToSuperMarketDto();
        }
    }
}
