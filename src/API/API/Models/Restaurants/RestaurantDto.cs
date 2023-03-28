using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static API.Domain.Restaurant;

namespace API.Models
{
    public record RestaurantDto(Guid id,
                               Guid ownerId,
                               string address,
                               string phoneNumber,
                               string email,
                               string name,
                               string normalizedName,
                               string slugId,
                               string imageUrl,
                               string description,
                               List<string> menuImagesUrls,
                               List<PhotoDto> photosUrls,
                               List<OpeningHourDto> openingHours,
                               DeliveryMethod TypeDeliveryMethod,
                               List<RestaurantCategorieDto> RestaurantCategories)
    {
           
    }

    public record OpeningHourDto(int dayOfWeek, [Required] SlotDto slot1, SlotDto slot2);

    public record SlotDto(string startTime, string endTime);
}
