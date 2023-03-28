using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Product
    {
        public Guid Id { get; private set; }
        public Guid CardId { get; private set; }
        public string Name { get; private set; }
        public decimal Price { get; private set; }
        public decimal OriginalPrice { get; private set; }
        public string Description { get; private set; }
        public Categorie Categorie { get; private set; }
        public string ImageUrl { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public Guid ProductTypeId { get; private set; }

        private Product()
        {
        }
        public Product(Guid id, Guid cardId, string name, string imageUrl, decimal price, decimal originalPrice, string description, Categorie categorie, Guid productTypeId)
        {
            Id = id;
            CardId = cardId;
            Name = name;
            ImageUrl = imageUrl;
            Price = price;
            OriginalPrice = originalPrice;
            Description = description;
            Categorie = categorie;
            CreatedAt = DateTime.UtcNow;
            ProductTypeId = productTypeId;
        }

        internal void AddOrUpdateImageUrl(string imageUrl)
        {
            ImageUrl = imageUrl;
        }

        internal void Update(string name, string description, decimal price, Categorie categorie, Guid productTypeId, string imageUrl = null)
        {
            Description = description ?? Description;
            Name = name ?? Name;
            Price = price;
            Categorie = categorie;
            ImageUrl = imageUrl ?? ImageUrl;
            ProductTypeId = productTypeId;
        }

    }
}
