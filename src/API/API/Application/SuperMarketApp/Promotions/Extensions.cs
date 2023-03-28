using API.Application.SuperMarketApp.SuperMarkets;
using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Promotions
{
    public static class Extensions
    {
        public static PromotionDto ProjectToPromotionDto(this PromotionSuperMarket promotion, IReadOnlyList<SuperMarket> superMarkets, IReadOnlyList<Category> categories)
        {
            var category = categories.FirstOrDefault(c => c.Id == promotion.CategoryId);
            var categoryDto = category == null ? null : new CategoryDto(category.Id, category.DisplayName, category.Value);
            var superMarket = superMarkets.FirstOrDefault(s => s.Id == promotion.SuperMarketId);
            var superMarketDto = superMarket?.ProjectToSuperMarketDto();

            return new PromotionDto(promotion.Id,
                                     superMarketDto,
                                     promotion.Name,
                                     promotion.StartDate,
                                     promotion.EndDate,
                                     promotion.Reduction,
                                     categoryDto,
                                     promotion.ImageUrl
                                 );
        }
    }
}
