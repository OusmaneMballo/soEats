using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public record ReportingDto(RestaurantDto Restaurant,
                                decimal TurnoverWithoutPromotion,
                                decimal TurnoverWithPromotion,
                                decimal Turnover,
                                decimal CommissionSoeat,
                                decimal BudgetPromotion,
                                int NumberOfOrdersByMonth,
                                decimal AmountOfDeliveries)
    {

    }
}
