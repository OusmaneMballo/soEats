using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class PromotionSuperMarket
    {
        public Guid Id { get; private set; }
        public Guid SuperMarketId { get; private set; }
        public string Name { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public double Reduction { get; private set; }
        public Guid CategoryId { get; private set; }
        public string ImageUrl { get; private set; }

        private PromotionSuperMarket()
        { }
        public PromotionSuperMarket(Guid id, Guid superMarketId, string name, DateTime startDate, DateTime endDate, double reduction, Guid categoryId, string imageUrl)
        {
            Id = id;
            SuperMarketId = superMarketId;
            Name = name;
            StartDate = startDate;
            EndDate = endDate;
            Reduction = reduction;
            CategoryId = categoryId;
            ImageUrl = imageUrl;
        }

        internal void Update(string name, DateTime starDate, DateTime endDate, double reduction, Guid categoryId)
        {
            Name = name ?? Name;
            StartDate = starDate;
            EndDate = endDate;
            Reduction = reduction !=0 ? reduction : Reduction;
            CategoryId = categoryId;
        }
    }

}
