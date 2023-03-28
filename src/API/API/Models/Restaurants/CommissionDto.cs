using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record CommissionDto(Guid Id,
                                  decimal Percentage,
                                  decimal MaximumLevelPrice,
                                  decimal MinimumLevelPrice
                                 )
    {

    }
}
