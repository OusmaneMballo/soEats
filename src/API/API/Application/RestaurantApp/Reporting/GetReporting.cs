using API.Application.Restaurants;
using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Reporting
{
    public class GetReportingQuery : IRequest<IEnumerable<ReportingDto>>
    {
        [Required]
        public Guid OwnerId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
    }

    public class GetReportingQueryHandler : IRequestHandler<GetReportingQuery, IEnumerable<ReportingDto>>
    {
        private readonly IQuerySession _querySession;

        public GetReportingQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<ReportingDto>> Handle(GetReportingQuery request, CancellationToken cancellationToken)
        {

            List<ReportingDto> Reports = new List<ReportingDto>();
            var restaurantCategories = await _querySession.Query<RestaurantCategorie>().ToListAsync();
            var restaurants = (await _querySession.Query<Restaurant>()
                                           .Where(r => r.OwnerId == request.OwnerId)
                                           .OrderBy(r => r.Name)
                                           .ToListAsync())
                                           .Select(r => r.ProjectToRestaurantDto(restaurantCategories));

            if (restaurants != null)
            {
                foreach(var restaurant in restaurants)
                {
                    var orders = await _querySession.Query<Order>()
                                            .Where(o => o.RestaurantId == restaurant.id && o.OrderDate >= request.StartDate && o.OrderDate < request.EndDate && o.OrderStatus == Order.Status.Confirmed)
                                            .ToListAsync();
                    decimal TurnoverWithoutPromotion = 0;
                    decimal TurnoverWithPromotion = 0;
                    decimal Turnover = 0;
                    decimal CommissionSoeat = 0;
                    decimal BudgetPromotion = 0;
                    int NumberOfOrdersByMonth = orders.Count;
                    decimal AmountOfDeliveries = 0;

                    foreach (var order in orders)
                    {
                        AmountOfDeliveries += order.DeliveryPrice;

                        foreach (var productItem in order.OrderProductItems)
                        {
                            var realPrice = productItem.GetRealPrice();
                            var originalPrice = productItem.GetOriginalPrice();
                            if (realPrice == originalPrice)
                            {
                                TurnoverWithoutPromotion += originalPrice;
                            }
                            else
                            {
                                TurnoverWithPromotion += realPrice;
                                BudgetPromotion += (originalPrice - realPrice);
                            }

                        }

                        foreach (var menuItem in order.OrderMenuItems)
                        {
                            TurnoverWithoutPromotion += menuItem.Menu.Price;
                        }


                    }
                    Turnover = TurnoverWithPromotion + TurnoverWithoutPromotion;
                    var commissions = await _querySession.Query<Commission>().ToListAsync();

                    foreach (var commission in commissions)
                    {
                        if (Turnover <= commission.MaximumLevelPrice)
                        {
                            CommissionSoeat += (Turnover - commission.MinimumLevelPrice) * (commission.Percentage / 100);
                            break;
                        }
                        else
                        {
                            CommissionSoeat += (commission.MaximumLevelPrice - commission.MinimumLevelPrice) * (commission.Percentage / 100);
                        }
                    }

                    Reports.Add(new ReportingDto(restaurant, TurnoverWithoutPromotion, TurnoverWithPromotion, Turnover, CommissionSoeat, BudgetPromotion >0 ? BudgetPromotion : 0, NumberOfOrdersByMonth, AmountOfDeliveries));
                }
            }

            return Reports;
        }
    }
}
