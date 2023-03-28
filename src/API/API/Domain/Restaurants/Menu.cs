using System;
using System.Collections.Generic;

namespace API.Domain
{
    public class Menu
    {
        public Guid Id { get; private set; }
        public Guid CardId { get; private set; }
        public string Name { get; private set; }

        public decimal Price { get; private set; }
        public string ImageUrl { get; private set; }
        public List<Guid> ProductIds { get; private set; } = new();
        private Menu()
        {
        }

        public Menu(Guid id, Guid cardId, string name, decimal price, string imageUrl, List<Guid> productIds)
        {
            Id = id;
            CardId = cardId;
            Name = name;
            Price = price;
            ImageUrl = imageUrl;
            ProductIds = productIds;
        }

        internal void Update(string name, decimal price, string imageUrl, List<Guid> productIds)
        {
            Name = name;
            Price = price;
            ImageUrl = imageUrl;
            ProductIds = productIds;
        }

        internal void Update(string name, decimal price, List<Guid> productIds)
        {
            Name = name;
            Price = price;
            ProductIds = productIds;
        }

        internal void AddProduit(Guid productId)
        {
            ProductIds.Add(productId);
        }

        internal void DeleteProduct(Guid productId)
        {
            ProductIds.Remove(productId);
        }

        internal void AddOrUpdateImageUrl(string imageUrl)
        {
            ImageUrl = imageUrl;
        }
    }
}