using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Commission
    {
        public Guid Id { get; private set; }
        public decimal Percentage { get; private set; }
        public decimal MaximumLevelPrice { get; private set; }
        public decimal MinimumLevelPrice { get; private set; }

        private Commission()
        {
        }

        public Commission(Guid id, decimal percentage, decimal maximumLevelPrice, decimal minimumLevelPrice)
        {
            Id = id;
            Percentage = percentage;
            MaximumLevelPrice = maximumLevelPrice;
            MinimumLevelPrice = minimumLevelPrice;
        }
    }
}
