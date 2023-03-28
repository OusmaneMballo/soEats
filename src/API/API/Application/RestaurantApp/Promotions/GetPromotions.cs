using API.Application.Common;
using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Promotions
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
            var productTypes = await _querySession.Query<ProductType>().ToListAsync();
            var restaurants = await _querySession.Query<Restaurant>().ToListAsync();
            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();

            return (await _querySession.Query<Promotion>()
                                       .Where(p => p.StartDate <= utcNow && utcNow <= p.EndDate)
                                       .ToListAsync())
                                       .Select(p => p.ProjectToPromotionDto(productTypes, restaurants, restaurantCategories));
        }
    }
}
