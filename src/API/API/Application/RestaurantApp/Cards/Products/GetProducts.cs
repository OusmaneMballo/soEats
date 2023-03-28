using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class GetProductsQuery : IRequest<IEnumerable<ProductDto>>
    {
        public Guid CardId { get; set; }
    }
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, IEnumerable<ProductDto>>
    {
        private readonly IQuerySession _querySession;

        public GetProductsQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var card = await _querySession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            var productTypes = await _querySession.Query<ProductType>().ToListAsync();

            return card.Products.Select(p => p.ProjectToProductDto(productTypes));

        }

    }
}
