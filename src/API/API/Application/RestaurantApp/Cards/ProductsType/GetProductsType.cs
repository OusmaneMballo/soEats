using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.ProductsType
{
    public class GetProductsTypeQuery : IRequest<IEnumerable<ProductTypeDto>>
    {
    }
    public class GetProductsTypeQueryHandler : IRequestHandler<GetProductsTypeQuery, IEnumerable<ProductTypeDto>>
    {
        private readonly IQuerySession _querySession;

        public GetProductsTypeQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<ProductTypeDto>> Handle(GetProductsTypeQuery request, CancellationToken cancellationToken)
        {
            return (await _querySession.Query<ProductType>()
                                       .ToListAsync())
                                       .Select(r => r.ProjectToProductTypeDto());
        }
    }
}
