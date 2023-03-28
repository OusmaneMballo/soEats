using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Restaurants
{
    public class GetRestaurantByIdQuery : IRequest<RestaurantDto>
    {
        public Guid RestaurateurId { get; set; }
        public Guid RestaurantId { get; set; }
    }

    public class GetRestaurantByIdQueryHandler : IRequestHandler<GetRestaurantByIdQuery, RestaurantDto>
    {
        private readonly IQuerySession _querySession;

        public GetRestaurantByIdQueryHandler( IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<RestaurantDto> Handle(GetRestaurantByIdQuery request, CancellationToken cancellationToken)
        {
            var restaurant = await _querySession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.RestaurateurId);
            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();

            if (restaurant == null)
                return null;

            return restaurant.ProjectToRestaurantDto(restaurantCategories);
        }
    }
}
