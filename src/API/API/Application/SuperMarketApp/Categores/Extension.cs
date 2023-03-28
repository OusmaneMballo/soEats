using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Categores
{
    public static class Extension
    {
        public static CategoryDto projectToCategoryDto(this Category category)
        {
            return new CategoryDto(category.Id, category.DisplayName, category.Value);
        }
    }
}
