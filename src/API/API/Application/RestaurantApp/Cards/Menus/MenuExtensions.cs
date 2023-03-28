using API.Application.Cards.Products;
using API.Domain;
using API.Models;
using System.Collections.Generic;
using System.Linq;
namespace API.Application.Cards.Menus
{
    public static class MenuExtensions
    {
        public static MenuDto BuildMenu(this Menu m, Card card, IReadOnlyList<ProductType> productTypes)
        {
            var productIds = m.ProductIds;
            var products = productIds.Select(productId => {
                var product = card.Products.FirstOrDefault(p => p.Id == productId);
                return product.ProjectToProductDto(productTypes);
            });
            return new MenuDto(m.Id,
                               m.CardId,
                               m.Name,
                               m.Price,
                               m.ImageUrl,
                               products.ToList());
        }

        public static MenusDto ProjectToMenusDto(this Menu m)
        {
            return new MenusDto(m.Id,
                               m.Name,
                               m.Price,
                               m.ImageUrl,
                               m.ProductIds);
        }

    }
}
