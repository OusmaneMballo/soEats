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
    public class GetProductsByIdSuperMarketQuery : IRequest<IEnumerable<ProductDto>>
    {
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class GetProductsByIdSuperMarketQueryHandler : IRequestHandler<GetProductsByIdSuperMarketQuery, IEnumerable<ProductDto>>
    {
        private readonly IQuerySession _querySession;

        public GetProductsByIdSuperMarketQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetProductsByIdSuperMarketQuery request, CancellationToken cancellationToken)
        {
            var sections = await _querySession.Query<Section>().Where(s => s.SuperMarketId == request.IdSuperMarket).ToListAsync();
            List<ProductDto> productsDto = new List<ProductDto>();
            foreach(var section in sections)
            {
                foreach(var product in section.Products)
                {
                    productsDto.Add(new ProductDto(product.Id, request.IdSuperMarket, section.Id, product.Name, product.Price, product.OriginalPrice, product.Description, product.Category, product.ImageUrl));
                }

            }

            return productsDto;
        }
    }
}
