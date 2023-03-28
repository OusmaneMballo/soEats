using API.Domain;
using API.Domain.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.SuperMarkets
{
    public record ProductDto(Guid Id,
                             Guid SuperMarketId,
                             Guid SectionId,
                             string Name,
                             decimal Price,
                             decimal OriginalPrice,
                             string Description,
                             Category Category,
                             string ImageUrl)
    {
    }
}
