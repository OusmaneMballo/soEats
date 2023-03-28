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

namespace API.Application.Restaurants
{
    public class GetRestaurantsQuery : IRequest<IEnumerable<RestaurantDto>>
    {
        public Guid OwnerId { get; set; }
    }

    public class GetRestaurantsQueryHandler : IRequestHandler<GetRestaurantsQuery, IEnumerable<RestaurantDto>>
    {
        private readonly IQuerySession _querySession;

        public GetRestaurantsQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<RestaurantDto>> Handle(GetRestaurantsQuery request, CancellationToken cancellationToken)
        {

            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();
            if (request.OwnerId != Guid.Empty)
            {
                return (await _querySession.Query<Restaurant>()
                                           .Where(r => r.OwnerId == request.OwnerId)
                                           .OrderByDescending(r => r.CreatedAt)
                                           .ToListAsync())
                                           .Select(r => r.ProjectToRestaurantDto(restaurantCategories));
            }

            return (await _querySession.Query<Restaurant>()
                                       .OrderByDescending(r => r.CreatedAt)
                                       .ToListAsync())
                                       .Where(r => r.IsFullyConfigured())
                                       .Select(r => r.ProjectToRestaurantDto(restaurantCategories));
        }
    }
}
