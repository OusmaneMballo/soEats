using API.Domain;
using API.Infrastructure;
using API.Models;
using Marten;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Restaurants
{
    public class GetRestaurantBySlugIdQuery : IRequest<RestaurantDto>
    {
        public string SlugId { get; set; }
    }

    public class GetRestaurantBySlugIdQueryHandler : IRequestHandler<GetRestaurantBySlugIdQuery, RestaurantDto>
    {
        private readonly IQuerySession _querySession;

        public GetRestaurantBySlugIdQueryHandler( IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<RestaurantDto> Handle(GetRestaurantBySlugIdQuery request, CancellationToken cancellationToken)
        {
            var restaurant = await _querySession.Query<Restaurant>().FirstOrDefaultAsync(r => r.SlugId == request.SlugId);
            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();
            if (restaurant == null)
                return null;

            return restaurant.ProjectToRestaurantDto(restaurantCategories);
        }
    }
}
