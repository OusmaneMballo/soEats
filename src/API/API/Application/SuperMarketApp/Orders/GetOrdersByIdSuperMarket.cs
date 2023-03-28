using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Orders
{
    public class GetOrdersByIdSuperMarketQuery : IRequest<IEnumerable<OrderDto>>
    {
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class GetOrdersByIdSuperMarketQueryHandler : IRequestHandler<GetOrdersByIdSuperMarketQuery, IEnumerable<OrderDto>>
    {
        private readonly IQuerySession _querySession;
        private readonly IConfiguration _configuration;

        public GetOrdersByIdSuperMarketQueryHandler(IQuerySession querySession, IConfiguration configuration)
        {
            _querySession = querySession;
            _configuration = configuration;
        }



        public async Task<IEnumerable<OrderDto>> Handle(GetOrdersByIdSuperMarketQuery request, CancellationToken cancellationToken)
        {
            if (request.IdSuperMarket == Guid.Empty)
            {
                return null;
            }
            return (await _querySession.Query<OrderSuperMarket>()
                                          .OrderByDescending(o => o.OrderDate)
                                          .Where(o => o.SuperMarketId == request.IdSuperMarket)
                                          .ToListAsync())
                                          .Select(o => o.ProjectToOrderDto(_configuration));
        }
    }
}
