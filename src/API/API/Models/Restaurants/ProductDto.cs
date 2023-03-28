using API.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record ProductDto(Guid Id,
                             Guid CardId,
                             string Name,
                             decimal Price,
                             decimal OriginalPrice,
                             string Description,
                             Categorie Categorie,
                             string ImageUrl,
                             ProductTypeDto ProductType)
    {
    }
}
