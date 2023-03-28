using API.Application.Photos;
using API.Application.RestaurantCategories;
using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Application.Restaurants
{
    public static class Extensions
    {
        public static RestaurantDto ProjectToRestaurantDto(this Restaurant restaurant, IReadOnlyList<RestaurantCategorie> restaurantCategories )
        {           
            return new RestaurantDto(restaurant.Id,
                                   restaurant.OwnerId,
                                   restaurant.Address,
                                   restaurant.Contact.PhoneNumber,
                                   restaurant.Contact.Email,
                                   restaurant.Name,
                                   restaurant.NormalizedName,
                                   restaurant.SlugId,
                                   restaurant.ImageUrl,
                                   restaurant.Description,
                                   restaurant.MenuImagesUrls.Select(im => im?.ImageUrl.AbsoluteUri).ToList(),
                                   restaurant.PhotosUrls.Select(im => im.ProjectToPhotoDto()).ToList(),
                                   restaurant.OpeningHours.Select(o => new OpeningHourDto((int)o.DayOfWeek,
                                                                                  new SlotDto(o.Slot1?.StartTime.ToString(@"hh\:mm"), o.Slot1?.EndTime.ToString(@"hh\:mm")),
                                                                                  new SlotDto(o.Slot2?.StartTime.ToString(@"hh\:mm"), o.Slot2?.EndTime.ToString(@"hh\:mm")))).ToList(),
                                   restaurant.TypeDeliveryMethod,
                                   restaurant.RestaurantCategories?.Select(restaurantCategorieId => {
                                        var restaurantCategorie = restaurantCategories.FirstOrDefault(rc => rc.Id == restaurantCategorieId);
                                           return restaurantCategorie.ProjectToRestaurantCategorieDto();
                                   }).ToList() 
                                   );
        }

        public static string GetUniqueString(this Guid id)
        {
            return Convert.ToBase64String(id.ToByteArray())
                              .Replace("/", "")
                              .Replace("+", "")
                              .ToLowerInvariant()
                              .Substring(0, 8);
        }
    }
}
