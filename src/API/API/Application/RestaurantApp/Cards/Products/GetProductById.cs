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
    public class GetProductByIdQuery : IRequest<ProductDto>
    {
        public Guid CardId { get; set; }
        public Guid ProductId { get; set; }

    }

    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto>
    {
        private readonly IQuerySession _querySession;
        public GetProductByIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;

        }
        public async Task<ProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var card = await _querySession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            var productTypes = await _querySession.Query<ProductType>().ToListAsync();

            var product = card.GetProduct(request.ProductId);

            return product.ProjectToProductDto(productTypes);
        }
    }
}
