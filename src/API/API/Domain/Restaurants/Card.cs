using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Card
    {
        public Guid Id { get; private set; }
        public Guid RestaurantId { get; private set; }
        public string Name { get; private set; }
        public List<Product> Products { get; private set; } = new();
        public List<Menu> Menus { get; private set; } = new();

        private Card()
        {
        }

        public Card(Guid id, Guid restaurantId, string name)
        {
            Id = id;
            RestaurantId = restaurantId;
            Name = name;
        }

        internal void AddMenu(Menu menu)
        {
            Menus.Add(menu);
        }

        internal void AddProduct(Product product)
        {
            Products.Add(product);
        }

        internal void DeleteCardProduct(Guid productId)
        {
            var product = Products.SingleOrDefault(p => p.Id == productId);
            var menus = Menus.Where(m => m.ProductIds.Contains(product.Id)).ToList();
            menus.ForEach(m => m.DeleteProduct(product.Id));

            Products.Remove(product);
        }

        internal Menu MenusContainsProducts(Guid menuId)
        {
             var menu = Menus.Where(m => m.Id.Equals(menuId)).SingleOrDefault();
             return menu;
        }
        
        internal Product GetProduct(Guid producId)
        {
             var product = Products.Where(p => p.Id.Equals(producId)).SingleOrDefault();
             return product;
        }
        internal void DeleteMenuProduct(Guid menuId, Guid productId)
        {
            var product = Products.SingleOrDefault(p => p.Id == productId);
            var menu = Menus.Where(m => m.Id.Equals(menuId) && m.ProductIds.Contains(product.Id)).SingleOrDefault();
            menu.DeleteProduct(product.Id);
        }

        internal void AddProductToMenu(Guid menuId, Guid productId)
        {
            var menu = Menus.SingleOrDefault(m => m.Id == menuId);
            var product = Products.Where(p => p.Id.Equals(productId)).SingleOrDefault();
            menu.AddProduit(product.Id);
        }

        internal List<Product> GetProducts(List<Guid> productsId)
        {
            return productsId.Select(id => Products.FirstOrDefault(p => p.Id == id)).ToList();
        }

        internal void DeleteMenu(Guid menuId)
        {
            var menu = Menus.Where(m => m.Id.Equals(menuId)).SingleOrDefault();
            Menus.Remove(menu);
            
        }
    }
}
