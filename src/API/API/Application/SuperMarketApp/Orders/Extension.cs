using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Orders
{
    public static class Extensions
    {
        public static OrderDto ProjectToOrderDto(this OrderSuperMarket o, IConfiguration configuration)
        {
            return new OrderDto(o.Id,
                                o.SuperMarketId,
                                o.CustomerFirstname,
                                o.CustomerLastname,
                                o.CustomerPhoneNumber,
                                o.CustomerEmail,
                                o.CustomerAdress,
                                o.DeliveryZone,
                                o.DeliveryPrice,
                                o.Remark,
                                o.OrderDate,
                                o.OrderNumber.ToString("D" + configuration["SoEats:OrderNumberOfDigits"]),
                                o.Amount,
                                o.OrderProductItems,
                                o.OrderDeliveryMethod,
                                o.OrderStatus);
        }
    }
}
