using API.Domain.SuperMarkets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static API.Domain.SuperMarkets.OrderSuperMarket;

namespace API.Models.SuperMarkets
{
    public record OrderDto(Guid Id,
                           Guid SuperMarketId,
                           string CustomerFirstname,
                           string CustomerLastname,
                           string CustomerPhoneNumber,
                           string CustomerEmail,
                           string CustomerAdress,
                           string DeliveryZone,
                           decimal DeliveryPrice,
                           string Remark,
                           DateTime OrderDate,
                           string OrderNumber,
                           decimal Amount,
                           List<OrderProductItem> OrderProductItems,
                           DeliveryMethod OrderDeliveryMethod,
                           Status OrderStatus)

    { }
}
