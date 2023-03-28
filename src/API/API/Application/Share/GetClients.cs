using API.Application.Restaurants;
using API.Application.SuperMarketApp.SuperMarkets;
using API.Domain;
using API.Domain.SuperMarkets;
using API.Models.Share;
using Marten;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Share
{
    public class GetClientsQuery : IRequest<ClientDto>
    {
    }


    public class GetClientQueryHandler : IRequestHandler<GetClientsQuery, ClientDto>
    {
        private readonly IQuerySession _querySession;

        public GetClientQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<ClientDto> Handle(GetClientsQuery request, CancellationToken cancellationToken)
        {

            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();

            var restaurantDto = (await _querySession.Query<Restaurant>()
                                       .OrderByDescending(r => r.CreatedAt)
                                       .ToListAsync())
                                       .Where(r => r.IsFullyConfigured())
                                       .Select(r => r.ProjectToRestaurantDto(restaurantCategories)).ToList();

            var superMarketDto = (await _querySession.Query<SuperMarket>()
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync())
                .Where(s => s.IsFullyConfigured())
                .Select(s => s.ProjectToSuperMarketDto()).ToList();

            return new ClientDto(restaurantDto, superMarketDto);
        }
    }
}
