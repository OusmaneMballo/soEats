using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.RestaurantCategories
{
    public static class Extensions
    {
        public static RestaurantCategorieDto ProjectToRestaurantCategorieDto(this RestaurantCategorie restaurantCategorie)
        {
            return new RestaurantCategorieDto(restaurantCategorie.Id,
                                        restaurantCategorie.DisplayName,
                                        restaurantCategorie.Value, 
                                        restaurantCategorie.ImageUrl
                                );
        }
    }
}
