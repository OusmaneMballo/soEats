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
    public class GetSuperMarketBySlugIdQuery : IRequest<SuperMarketDto>
    {
        [Required]
        public string SlugId { get; set; }
    }

    public class GetSuperMarketBySlugIdQueryHandler : IRequestHandler<GetSuperMarketBySlugIdQuery, SuperMarketDto>
    {
        private readonly IQuerySession _querySession;

        public GetSuperMarketBySlugIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<SuperMarketDto> Handle(GetSuperMarketBySlugIdQuery request, CancellationToken cancellationToken)
        {
            var superMarket = await _querySession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.SlugId == request.SlugId);
            
            if(superMarket == null)
            {
                return null;
            }

            return superMarket.ProjectToSuperMarketDto();
        }
    }
}
