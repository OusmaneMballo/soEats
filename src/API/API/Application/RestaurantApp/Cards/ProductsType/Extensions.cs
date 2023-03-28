using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Cards.ProductsType
{
    public static class Extensions
    {
        public static ProductTypeDto ProjectToProductTypeDto(this ProductType productType)
        {
            return new ProductTypeDto(  productType.Id,
                                        productType.DisplayName,
                                        productType.Value
                                );
        }
    }
}
