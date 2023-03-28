using API.Domain;
using API.Models;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Orders
{
    public class GetOrderByIdQuery : IRequest<OrderDto>
    {
        public Guid RestaurantId { get; set; }
        public Guid OrderId { get; set; }
    }

    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto>
    {
        private readonly IQuerySession _querySession;
        private readonly IConfiguration _configuration;
        public GetOrderByIdQueryHandler(IQuerySession querySession, IConfiguration configuration)
        {
            _querySession = querySession;
            _configuration = configuration;
        }
        public async Task<OrderDto> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            var order = await _querySession.Query<Order>().FirstOrDefaultAsync(o => o.OrderId == request.OrderId);
            return order.ProjectToOrderDto(_configuration);
        }
    }

}
