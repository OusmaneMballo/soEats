using API.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record CardDto(Guid id,
                          string name,
                          List<ProductDto> products,
                          List<MenuDto> menus)
    {
    }
}
