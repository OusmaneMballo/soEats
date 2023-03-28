using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record DeliveryZoneDto(Guid Id,
                                  int ZoneId,
                                  decimal DeliveryPrice,
                                  List<string> Zones
                                 )
    {
    }
}
