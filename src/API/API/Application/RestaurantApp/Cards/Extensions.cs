using API.Application.Cards.Products;
using API.Domain;
using API.Models;
using System.Linq;
using API.Application.Cards.Menus;
using System.Collections.Generic;

namespace API.Application.Cards
{
    public static class Extensions
    {
        public static CardDto ProjectToCarteDto(this Card card, IReadOnlyList<ProductType> productTypes)
        {
            return new CardDto(card.Id,
                               card.Name,
                               card.Products.Select(p => p.ProjectToProductDto(productTypes)).ToList(),
                               card.Menus.Select(m => m.BuildMenu(card, productTypes)).ToList());
        }

    }
}
