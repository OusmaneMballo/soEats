using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class Product
    {

        public Guid Id { get; private set; }
        public Guid SuperMarketId { get; private set; }
        public Guid SectionId { get; private set; }
        public string Name { get; private set; }
        public decimal Price { get; private set; }
        public decimal OriginalPrice { get; private set; }
        public string Description { get; private set; }
        public Category Category { get; private set; }
        public string ImageUrl { get; private set; }
        public DateTime CreatedAt { get; private set; }

        private Product()
        {
        }

        public Product(Guid id, Guid superMarketId, Guid sectionId, string name, decimal price, decimal originalPrice, string description, Category category, string imageUrl)
        {
            Id = id;
            SuperMarketId = superMarketId;
            SectionId = sectionId;
            Name = name;
            Price = price;
            OriginalPrice = originalPrice;
            Description = description;
            Category = category;
            ImageUrl = imageUrl;
            CreatedAt = DateTime.UtcNow;
        }

        internal void Update(string name, decimal originalPrice, string description, Category category, string imageUrl)
        {
            Name = name;
            OriginalPrice = originalPrice;
            Description = description ?? Description;
            Category = category ?? Category;
            ImageUrl = imageUrl ?? ImageUrl;
        }

        internal void AddOrUpdateImageUrl(string imageUrl)
        {
            ImageUrl = imageUrl;
        }
    }
}
