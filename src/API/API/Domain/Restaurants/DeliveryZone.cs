using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class DeliveryZone
    {
        public Guid Id { get; private set; }
        public int ZoneId { get; private set; }
        public decimal DeliveryPrice { get; private set; }
        public List<string> Zones { get; private set; }

        private DeliveryZone()
        {
        }

        public DeliveryZone(Guid id, int zoneId, decimal deliveryPrice, List<string> zones)
        {
            Id = id;
            ZoneId = zoneId;
            DeliveryPrice = deliveryPrice;
            Zones = zones;
        }
    }
}
