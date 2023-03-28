using API.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static API.Domain.Order;

namespace API.Models
{

    public record OrderDto(Guid id,
                           Guid restaurantId,
                           string customerFirstname,
                           string customerLastname,
                           string customerPhoneNumber,
                           string customerEmail,
                           string customerAdress,
                           string deliveryZone,
                           decimal deliveryPrice,
                           string remark,
                           DateTime OrderDate,
                           string orderNumber,
                           decimal amount,
                           List<OrderProductItem> orderProductItems,
                           List<OrderMenuItem> orderMenuItems,
                           DeliveryMethod orderDeliveryMethod,
                           Status orderStatus)

    { }

}
