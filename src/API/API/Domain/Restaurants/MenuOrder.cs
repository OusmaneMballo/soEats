using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class MenuOrder
    {
        public Guid Id { get; private set; }
        public Guid CardId { get; private set; }
        public string Name { get; private set; }

        public decimal Price { get; private set; }
        public string ImageUrl { get; private set; }
        public List<Product> Products { get; private set; } = new();
        private MenuOrder()
        {
        }

        public MenuOrder(Guid id, Guid cardId, string name, decimal price, string imageUrl, List<Product> products)
        {
            Id = id;
            CardId = cardId;
            Name = name;
            Price = price;
            ImageUrl = imageUrl;
            Products = products;
        }
    }
}
