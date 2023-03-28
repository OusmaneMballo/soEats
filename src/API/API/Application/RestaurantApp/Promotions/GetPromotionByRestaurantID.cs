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
    public class GetPromotionByRestaurantIdQuery : IRequest<IEnumerable<PromotionDto>>
    {
        public Guid RestaurantId { get; set; }
    }

    public class GetPromotionByRestaurantIdQueryHandler : IRequestHandler<GetPromotionByRestaurantIdQuery, IEnumerable<PromotionDto>>
    {
        private readonly IQuerySession _querySession;


        public GetPromotionByRestaurantIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<PromotionDto>> Handle(GetPromotionByRestaurantIdQuery request, CancellationToken cancellationToken)
        {
            if (request.RestaurantId == Guid.Empty)
            {
                return null;
            }
            var productTypes = await _querySession.Query<ProductType>().ToListAsync();
            var restaurants = await _querySession.Query<Restaurant>().ToListAsync();
            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();

            return (await _querySession.Query<Promotion>()
                                          .Where(p => p.RestaurantId == request.RestaurantId)
                                          .ToListAsync())
                                          .Select(p => p.ProjectToPromotionDto(productTypes, restaurants, restaurantCategories));
        }
        

    }
}
