using System;
using System.Collections.Generic;


namespace API.Domain
{
    public class Order
    {
        public Guid OrderId { get; private set; }
        public Guid RestaurantId { get; private set; }
        public string CustomerFirstname { get; private set; }
        public string CustomerLastname { get; private set; }
        public string CustomerPhoneNumber { get; private set; }
        public string CustomerEmail { get; private set; }
        public string CustomerAdress { get; private set; }
        public int OrderNumber { get; set; }
        public DateTime OrderDate { get; private set; }
        public decimal Amount { get; private set; }
        public decimal DeliveryPrice { get; set; }
        public string DeliveryZone { get; set; }
        public string Remark { get; set; }
        public List<OrderProductItem> OrderProductItems { get; private set; }
        public List<OrderMenuItem> OrderMenuItems { get; private set; }
        public DeliveryMethod OrderDeliveryMethod { get; private set; }
        public Status OrderStatus { get; set; }


        private Order()
        {
        }


        public Order(Guid orderId, Guid restaurantId, decimal amount,
                     string customerFirstname, string customerLastname, string customerPhoneNumber, string customerEmail,
                     string customerAdress, DateTime orderDate, string deliveryZone, decimal deliveryPrice, string remark, List<OrderProductItem> orderProductItems,
                     List<OrderMenuItem> orderMenuItems, DeliveryMethod orderDeliveryMethod)
        {
            OrderId = orderId;
            RestaurantId = restaurantId;
            Amount = amount;
            CustomerFirstname = customerFirstname;
            CustomerLastname = customerLastname;
            CustomerPhoneNumber = customerPhoneNumber;
            CustomerEmail = customerEmail;
            CustomerAdress = customerAdress;
            OrderDate = orderDate;
            DeliveryZone = deliveryZone;
            DeliveryPrice = deliveryPrice;
            Remark = remark;
            OrderProductItems = orderProductItems;
            OrderMenuItems = orderMenuItems;
            OrderDeliveryMethod = orderDeliveryMethod;
            OrderStatus = Status.InProgress;
        }
        internal void Confirm()
        {
            if (OrderStatus == Status.InProgress)
                OrderStatus = Status.Confirmed;
        }
        internal void Cancel()
        {
            if (OrderStatus != Status.Cancelled)
                OrderStatus = Status.Cancelled;
        }

        public enum Status { InProgress, Confirmed, Cancelled }
        public enum DeliveryMethod { ToBeDelivered, ToTakeWith  }


    }

    public class OrderProductItem
    {
        public int Quantity { get; set; }
        public Product Product { get; set; }

        internal decimal GetRealPrice()
        {
            return Product.Price * Quantity;
        }
        internal decimal GetOriginalPrice()
        {
            return Product.OriginalPrice * Quantity;
        }
  
    }

    public class OrderMenuItem
    {
        public int Quantity { get;  set; }
        public MenuOrder Menu { get;   set; }
    }

}
