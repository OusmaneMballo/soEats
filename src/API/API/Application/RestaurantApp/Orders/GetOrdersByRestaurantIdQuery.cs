using API.Domain;
using API.Models;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Orders
{
    public class GetOrdersByRestaurantIdQuery : IRequest<IEnumerable<OrderDto>>
    {
        public Guid RestaurantId { get; set; }

    }

    public class GetOrdersByRestaurantIdQueryHandler : IRequestHandler<GetOrdersByRestaurantIdQuery, IEnumerable<OrderDto>>
    {
        private readonly IQuerySession _querySession;
        private readonly IConfiguration _configuration;

        public GetOrdersByRestaurantIdQueryHandler(IQuerySession querySession, IConfiguration configuration)
        {
            _querySession = querySession;
            _configuration = configuration;
        }

        public async Task<IEnumerable<OrderDto>> Handle(GetOrdersByRestaurantIdQuery request, CancellationToken cancellationToken)
        {
            if (request.RestaurantId == Guid.Empty)
            {
                return null;
            }
            return (await _querySession.Query<Order>()
                                          .OrderByDescending(o => o.OrderDate)
                                          .Where(o => o.RestaurantId == request.RestaurantId)
                                          .ToListAsync())
                                          .Select(o => o.ProjectToOrderDto(_configuration));
        }
    }
}
