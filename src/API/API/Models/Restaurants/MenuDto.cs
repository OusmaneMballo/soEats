using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record MenuDto(Guid id,
                          Guid cardId,
                          string name,
                          decimal price,
                          string imageUrl,
                          List<ProductDto> products)
    {}

    public record MenusDto(Guid id,
                          string name,
                          decimal price,
                          string imageUrl,
                          List<Guid> productIds)
    { }
}

