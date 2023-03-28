using API.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record PromotionDto(Guid Id,
                               RestaurantDto Restaurant,
                               string Name,
                               DateTime StartDate,
                               DateTime EndDate,
                               double Reduction,
                               Categorie Categorie,
                               ProductTypeDto ProductType,
                               string ImageUrl
                               )
    {
    }
}
