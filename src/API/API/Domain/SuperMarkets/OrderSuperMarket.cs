using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class OrderSuperMarket
    {
        public Guid Id { get; set; }
        public Guid SuperMarketId { get; private set; }
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
        public DeliveryMethod OrderDeliveryMethod { get; private set; }
        public Status OrderStatus { get; set; }

        private OrderSuperMarket()
        {
        }

        public OrderSuperMarket(Guid orderId, Guid superMarketId, decimal amount,
                     string customerFirstname, string customerLastname, string customerPhoneNumber, string customerEmail,
                     string customerAdress, DateTime orderDate, string deliveryZone, decimal deliveryPrice, string remark, List<OrderProductItem> orderProductItems,
                     DeliveryMethod orderDeliveryMethod)
        {
            Id = orderId;
            SuperMarketId = superMarketId;
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

        public enum DeliveryMethod { ToBeDelivered, ToTakeWith }

    }

    public enum Status { InProgress, Confirmed, Cancelled }

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
}
