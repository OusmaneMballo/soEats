using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections.Products
{
    public class GetProductByIdSuperMarketAndByIdSectionQuery : IRequest<IEnumerable<ProductDto>>
    {
        [Required]
        public Guid IdSuperMarket { get; set; }
        [Required]
        public Guid IdSection { get; set; }
    }

    public class GetProductByIdSuperMarketAndByIdSectionQueryHandler : IRequestHandler<GetProductByIdSuperMarketAndByIdSectionQuery, IEnumerable<ProductDto>>
    {
        private readonly IQuerySession _querySession;

        public GetProductByIdSuperMarketAndByIdSectionQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetProductByIdSuperMarketAndByIdSectionQuery request, CancellationToken cancellationToken)
        {
            var section = await _querySession.Query<Section>().FirstOrDefaultAsync(s => s.SuperMarketId == request.IdSuperMarket && s.Id == request.IdSection);
            var productsDto = section.Products.Select(p => { return new ProductDto(p.Id, request.IdSuperMarket, request.IdSection, p.Name, p.Price, p.OriginalPrice, p.Description, p.Category, p.ImageUrl); });
            
            return productsDto;
        }
    }
}
