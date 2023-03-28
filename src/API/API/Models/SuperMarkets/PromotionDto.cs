using API.Domain.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.SuperMarkets
{
    public record PromotionDto(Guid Id,
                               SuperMarketDto SuperMarket,
                               string Name,
                               DateTime StartDate,
                               DateTime EndDate,
                               double Reduction,
                               CategoryDto Category,
                               string ImageUrl)
    {
    }
}
