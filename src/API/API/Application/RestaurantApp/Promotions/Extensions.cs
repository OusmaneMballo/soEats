using API.Application.Cards.ProductsType;
using API.Application.Photos;
using API.Application.RestaurantCategories;
using API.Application.Restaurants;
using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Promotions
{
    public static class Extensions
    {
        public static PromotionDto ProjectToPromotionDto(this Promotion promotion, IReadOnlyList<ProductType> productTypes, IReadOnlyList<Restaurant> restaurants, IReadOnlyList<RestaurantCategorie> restaurantCategories)
        {
            var productType = productTypes.FirstOrDefault(p => p.Id == promotion.ProductTypeId);
            var productTypeDto = productType == null ? null : new ProductTypeDto(productType.Id, productType.DisplayName, productType.Value);

            var restaurant = restaurants.FirstOrDefault(r => r.Id == promotion.RestaurantId);

            var restaurantDto = restaurant == null ? null : restaurant.ProjectToRestaurantDto(restaurantCategories);
            return new PromotionDto( promotion.Id,
                                     restaurantDto,
                                     promotion.Name,
                                     promotion.StartDate,
                                     promotion.EndDate,
                                     promotion.Reduction,
                                     promotion.Categorie,
                                     productTypeDto,
                                     promotion.ImageUrl
                                 );
        }
    }
}
