using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class RestaurantCategorie
    {
        public Guid Id { get; private set; }
        public string DisplayName { get; private set; }
        public string Value { get; private set; }
        public string ImageUrl { get; private set; }
        private RestaurantCategorie()
        {
        }

        public RestaurantCategorie(Guid id, string displayName, string value, string imageUrl)
        {
            Id = id;
            DisplayName = displayName;
            Value = value;
            ImageUrl = imageUrl;
        }

        internal void UpdateRestaurantCategorieImage(string imageUrl)
        {
            ImageUrl = imageUrl;
        }

    }
}
