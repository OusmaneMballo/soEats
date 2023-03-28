using API.Application.Photos;
using API.Domain.SuperMarkets;
using API.Models;
using API.Models.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public static class Extension
    {
        public static SuperMarketDto ProjectToSuperMarketDto(this SuperMarket supermarket)
        {
            return new SuperMarketDto(supermarket.Id,
                                   supermarket.OwnerId,
                                   supermarket.Address,
                                   supermarket.Contact.PhoneNumber,
                                   supermarket.Contact.Email,
                                   supermarket.Name,
                                   supermarket.NormalizedName,
                                   supermarket.SlugId,
                                   supermarket.ImageUrl,
                                   supermarket.Description,
                                   supermarket.PhotosUrls.Select(im => im.ProjectToPhotoDto()).ToList(),
                                   supermarket.OpeningHours.Select(o => new OpeningHourDto((int)o.DayOfWeek,
                                                                                  new SlotDto(o.Slot1?.StartTime.ToString(@"hh\:mm"), o.Slot1?.EndTime.ToString(@"hh\:mm")),
                                                                                  new SlotDto(o.Slot2?.StartTime.ToString(@"hh\:mm"), o.Slot2?.EndTime.ToString(@"hh\:mm")))).ToList()
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
