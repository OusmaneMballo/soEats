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

namespace API.Application.SuperMarketApp.Promotions
{
    public class GetPromotionsByIdSuperMarketQuery : IRequest<IEnumerable<PromotionDto>>
    {
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class GetPromotionsByIdSuperMarketQueryHandler : IRequestHandler<GetPromotionsByIdSuperMarketQuery, IEnumerable<PromotionDto>>
    {
        private readonly IQuerySession _querySession;

        public GetPromotionsByIdSuperMarketQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<PromotionDto>> Handle(GetPromotionsByIdSuperMarketQuery request, CancellationToken cancellationToken)
        {
            var superMarket = await _querySession.Query<SuperMarket>().ToListAsync();
            var category = await _querySession.Query<Category>().ToListAsync();

            return (await _querySession.Query<PromotionSuperMarket>()
                                          .Where(p => p.SuperMarketId == request.IdSuperMarket)
                                          .ToListAsync())
                                          .Select(p => p.ProjectToPromotionDto(superMarket, category));
        }
    }
}
