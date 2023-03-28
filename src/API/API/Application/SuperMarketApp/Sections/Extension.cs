using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections
{
    public static class Extension
    {
        public static SectionDto ProjectToSectionDto(this Section section, IReadOnlyList<Category> categories)
        {
            return new SectionDto(section.Id, section.DisplayName, section.ImageUrl, section.SuperMarketId, section.CategoriesId?.Select(cId =>
            {
                var category = categories.FirstOrDefault(cat => cat.Id == cId);
                return new CategoryDto(category.Id, category.DisplayName, category.Value);
            }).ToList(),
            section.Products?.Select(p =>
                {
                    return new ProductDto(p.Id, p.SuperMarketId, p.SectionId, p.Name, p.Price, p.OriginalPrice, p.Description, p.Category, p.ImageUrl);
                }).ToList()
            );
        }
    }
}
