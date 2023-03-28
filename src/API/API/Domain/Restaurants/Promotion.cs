using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Promotion
    {
        public Guid Id { get; private set; }
        public Guid RestaurantId { get; private set; }
        public string Name { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public double Reduction { get; private set; }
        public Guid ProductTypeId { get; private set; }
        public Categorie Categorie { get; private set; }
        public string ImageUrl { get; private set; }
        private Promotion()
        {
        }

        public Promotion(Guid id, Guid restaurantId, string name, DateTime startDate, DateTime endDate, double reduction, Guid productTypeId, Categorie categorie, string imageUrl)
        {
            Id = id;
            RestaurantId = restaurantId;
            Name = name;
            StartDate = startDate;
            EndDate = endDate;
            Reduction = reduction;
            ProductTypeId = productTypeId;
            Categorie = categorie;
            ImageUrl = imageUrl;
        }

        internal void Update(Guid restaurantId,string name,DateTime starDate, DateTime endDate, double reduction, Guid productTypeId, Categorie categorie)
        {
            RestaurantId = restaurantId;
            Name = name;
            StartDate = starDate;
            EndDate = endDate;
            Reduction = reduction ;
            ProductTypeId = productTypeId;
            Categorie = categorie;

        }
        internal void UpdatePromotionImage(string imageUrl)
        {
            ImageUrl = imageUrl;
        }
    }
}
