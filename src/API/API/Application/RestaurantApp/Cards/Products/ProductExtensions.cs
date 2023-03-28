using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public static class ProductExtensions
    {
        public static ProductDto ProjectToProductDto(this Product product, IReadOnlyList<ProductType> productTypes)
        {
            var productType = productTypes.FirstOrDefault(p => p.Id == product.ProductTypeId);
            var productTypeDto = productType == null ? null : new ProductTypeDto(productType.Id, productType.DisplayName, productType.Value);
            return new ProductDto(product.Id,
                                  product.CardId,
                                  product.Name,
                                  product.Price,
                                  product.OriginalPrice,
                                  product.Description,
                                  product.Categorie,
                                  product.ImageUrl,
                                  productTypeDto);
                               
        }
    }
}
