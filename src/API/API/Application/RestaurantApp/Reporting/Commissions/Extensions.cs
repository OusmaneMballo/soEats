using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Commissions
{
    public static class Extensions
    {
        public static CommissionDto ProjectToCommisionDto(this Commission commission)
        {
            return new CommissionDto(commission.Id,
                                     commission.Percentage,
                                     commission.MaximumLevelPrice,
                                     commission.MinimumLevelPrice
                                );
        }
    }
}
