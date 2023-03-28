using API.Domain.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.SuperMarkets
{
    public record SectionDto(Guid Id, string DisplayName, string ImageUrl, Guid SuperMarketId, List<CategoryDto> Categories, List<ProductDto> Products)
    {
    }
}
