using API.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.SuperMarkets
{
    public record SuperMarketDto(
                                   Guid id,
                                   Guid ownerId,
                                   string address,
                                   string phoneNumber,
                                   string email,
                                   string name,
                                   string normalizedName,
                                   string slugId,
                                   string imageUrl,
                                   string description,
                                   List<PhotoDto> photosUrls,
                                   List<OpeningHourDto> openingHours)
    {
    }
}
