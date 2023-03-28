using API.Application.Common;
using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Promotions
{
    public class GetPromotionsQuery : IRequest<IEnumerable<PromotionDto>>
    {
    }

    public class GetPromotionsQueryHandler : IRequestHandler<GetPromotionsQuery, IEnumerable<PromotionDto>>
    {
        private readonly IQuerySession _querySession;
        private readonly IProvideDate _provideDate;

        public GetPromotionsQueryHandler(IQuerySession querySession, IProvideDate provideDate)
        {
            _querySession = querySession;
            _provideDate = provideDate;
        }

        public async Task<IEnumerable<PromotionDto>> Handle(GetPromotionsQuery request, CancellationToken cancellationToken)
        {
            var utcNow = _provideDate.UtcNow();

            var superMarket = await _querySession.Query<SuperMarket>().ToListAsync();
            var category = await _querySession.Query<Category>().ToListAsync();

            return (await _querySession.Query<PromotionSuperMarket>()
                                          .Where(p => p.StartDate <= utcNow && utcNow <= p.EndDate)
                                          .ToListAsync())
                                          .Select(p => p.ProjectToPromotionDto(superMarket, category));
        }
    }
}
