using API.Application.Cards.Products;
using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace API.Application.Orders
{
    public static class Extensions
    {
        public static OrderDto ProjectToOrderDto(this Order o, IConfiguration configuration)
        {
            return new OrderDto(o.OrderId,
                                o.RestaurantId,
                                o.CustomerFirstname,
                                o.CustomerLastname,
                                o.CustomerPhoneNumber,
                                o.CustomerEmail,
                                o.CustomerAdress,
                                o.DeliveryZone,
                                o.DeliveryPrice,
                                o.Remark,
                                o.OrderDate,
                                o.OrderNumber.ToString("D"+configuration["SoEats:OrderNumberOfDigits"]),
                                o.Amount,
                                o.OrderProductItems,
                                o.OrderMenuItems,
                                o.OrderDeliveryMethod,
                                o.OrderStatus);
        }
    }
}
