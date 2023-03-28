using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class Section
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Value { get; private set; }
        public string ImageUrl { get; set; }
        public Guid SuperMarketId { get; set; }
        public List<Guid> CategoriesId { get; set; } = new();
        public List<Product> Products { get; set; } = new();

        private Section()
        { }

        public Section(Guid id, string displayName, string value, string imageUrl, Guid superMarketId, List<Guid> categoriesId)
        {
            Id = id;
            DisplayName = displayName;
            Value = value;
            ImageUrl = imageUrl;
            SuperMarketId = superMarketId;
            CategoriesId = categoriesId;
        }

        internal void Update(string displayName, string value, string imageUrl)
        {
            DisplayName = displayName ?? DisplayName;
            Value = value ?? Value;
            ImageUrl = imageUrl ?? ImageUrl;
        }

        internal void AddProduct(Product product)
        {
            Products.Add(product);
        }

        internal Product getProduct(Guid idProduct)
        {
            return Products.Where(p => p.Id.Equals(idProduct)).SingleOrDefault();
        }

        internal void DeleteSectionProduct(Guid productId)
        {
            var product = Products.SingleOrDefault(p => p.Id == productId);
            Products.Remove(product);
        }

        internal void UpdateListProduct(List<Product> products)
        {
            Products = products ?? Products;
        }

        internal void UpdateListCategory(List<Guid> categoriesId)
        {
            CategoriesId = categoriesId ?? CategoriesId;
        }
    }
}
