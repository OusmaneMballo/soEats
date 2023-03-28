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
    public class GetOrdersByIdQuery : IRequest<OrderDto>
    {
        [Required]
        public Guid IdOrder { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class GetOrdersByIdQueryHandler : IRequestHandler<GetOrdersByIdQuery, OrderDto>
    {
        private readonly IQuerySession _querySession;
        private readonly IConfiguration _configuration;

        public GetOrdersByIdQueryHandler(IQuerySession querySession, IConfiguration configuration)
        {
            _querySession = querySession;
            _configuration = configuration;
        }

        public async Task<OrderDto> Handle(GetOrdersByIdQuery request, CancellationToken cancellationToken)
        {
            if (request.IdOrder == Guid.Empty)
            {
                return null;
            }
            var order = await _querySession.Query<OrderSuperMarket>().FirstOrDefaultAsync(o => o.SuperMarketId == request.IdSuperMarket && o.Id == request.IdOrder);
            
            return order.ProjectToOrderDto(_configuration);

        }
    }
}
