using API.Models.SuperMarkets;
using System.Collections.Generic;

namespace API.Models.Share
{
    public record ClientDto(
        List<RestaurantDto> restaurantDto,
        List<SuperMarketDto> superMarketDto
        )
    {
    }
}
