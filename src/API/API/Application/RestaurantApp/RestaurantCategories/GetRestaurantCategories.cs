using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.RestaurantCategories
{
    public class GetRestaurantCategoriesQuery : IRequest<IEnumerable<RestaurantCategorieDto>>
    {
    }
    public class GetRestaurantCategoriesQueryHandler : IRequestHandler<GetRestaurantCategoriesQuery, IEnumerable<RestaurantCategorieDto>>
    {
        private readonly IQuerySession _querySession;

        public GetRestaurantCategoriesQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<RestaurantCategorieDto>> Handle(GetRestaurantCategoriesQuery request, CancellationToken cancellationToken)
        {
            return (await _querySession.Query<RestaurantCategorie>()
                                       .ToListAsync())
                                       .Select(r => r.ProjectToRestaurantCategorieDto());
        }
    }
}
