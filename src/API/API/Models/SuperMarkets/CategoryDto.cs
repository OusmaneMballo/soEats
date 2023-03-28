using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.SuperMarkets
{
    public record CategoryDto(Guid Id, string DisplayName, string Value)
    {

    }
}
