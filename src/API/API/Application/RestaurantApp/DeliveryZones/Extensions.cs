using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.DeliveryZones
{
    public static class Extensions
    {
        public static DeliveryZoneDto ProjectToDeliveryZoneDto(this DeliveryZone deliveryZone)
        {
            return new DeliveryZoneDto(deliveryZone.Id,
                                        deliveryZone.ZoneId,
                                        deliveryZone.DeliveryPrice,
                                        deliveryZone.Zones.ToList()
                                );
        }
    }
}
