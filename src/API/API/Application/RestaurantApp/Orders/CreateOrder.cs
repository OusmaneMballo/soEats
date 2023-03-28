using API.Application.Common;
using API.Domain;
using Marten;
using Marten.Schema;
using Marten.Storage;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static API.Domain.Order;

namespace API.Application.Orders
{
    public class CreateOrderCommand : IRequest<Guid>
    {
        [Required]
        public Guid RestaurantId { get; set; }
        [Required]
        public string CustomerFirstname { get; set; }
        [Required]
        public string CustomerLastname { get; set; }
        [Required]
        public string CustomerPhoneNumber { get; set; }
        public string CustomerEmail { get; set; }
        [Required]
        public string CustomerAdress { get; set; }
       
        public string DeliveryZone { get; set; }
        public decimal DeliveryPrice { get; set; }
        
        public string Remark { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public List<OrderProductItem> OrderProductItems { get; set; }
        [Required]
        public List<OrderMenuItem> OrderMenuItems { get; set; }

        public DeliveryMethod OrderDeliveryMethod { get;  set; }

    }

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;
        private readonly ISendSMS _smsSender;

        public CreateOrderCommandHandler(IDocumentSession documentSession, IConfiguration configuration, ISendEmail sendGridEmailSender, ISendSMS smsSender)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
            _smsSender = smsSender;
        }

        public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var restaurantId = request.RestaurantId;
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId);
            var orderId = Guid.Empty ;


            if (restaurant != null)
            {
                var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.RestaurantId == restaurant.Id);

                if (card != null)
                {
                    orderId = Guid.NewGuid();

                    var order = new Order(orderId, restaurantId, request.Amount, request.CustomerFirstname,
                                     request.CustomerLastname, request.CustomerPhoneNumber, request.CustomerEmail,
                                     request.CustomerAdress, request.OrderDate, request.DeliveryZone, request.DeliveryPrice, request.Remark,
                                     request.OrderProductItems, request.OrderMenuItems, request.OrderDeliveryMethod);

                    _documentSession.Store(order);
                                        
                    await _documentSession.SaveChangesAsync();

                    await SendEmailToClientAsync(order, restaurant);

                    await SendSMSToRestaurant(order, restaurant);
                    await SendSMSToClient(order, restaurant);

                }
            }

            return orderId;

        }

        private async Task SendSMSToRestaurant(Order order, Restaurant restaurant)
        {
            var subject = "Réception commande So Eats";
            var content = $"Hello {restaurant.Name}, vous venez de recevoir la commande numéro {order.OrderNumber} " +
                $"du client {order.CustomerFirstname} {order.CustomerLastname} ({order.CustomerPhoneNumber} à {order.CustomerAdress}). " +
                $"Mode de livraison : {(order.OrderDeliveryMethod == DeliveryMethod.ToBeDelivered ? "à Livrer" : " à Emporter")}" +
                $"Merci de traiter la commande depuis l’interface So Eats : \n" +
                $"{BuildSmsContent(order)}";
           
            await _smsSender.SendAsync(subject, content, restaurant.Contact.PhoneNumber, _configuration["SoEats:PhoneNumber"]);
        }

        private async Task SendSMSToClient(Order order, Restaurant restaurant)
        {
            var subject = "Réception commande So Eats";
            var content = $"Hello {order.CustomerFirstname} {order.CustomerLastname}, votre commande numéro {order.OrderNumber} vient d'être transmise au restaurant {restaurant.Name}.\n" +
                $"Merci de contacter notre service client au {_configuration["SoEats:PhoneNumber"]} pour toute question.\n" +
                $"Détails de votre commande : \n" +
                $"{BuildSmsContent(order)}";

            await _smsSender.SendAsync(subject, content, order.CustomerPhoneNumber);
        }

        private string BuildSmsContent(Order order)
        {
            var result = new StringBuilder();

            foreach (var productItem in order.OrderProductItems)
            {
                result.AppendLine($"- {productItem.Quantity} x {productItem.Product.Name}");
            }

            foreach (var menuItem in order.OrderMenuItems)
            {
                result.AppendLine($"- {menuItem.Quantity} x Menu{(menuItem.Quantity > 1 ? "s" : "")} {menuItem.Menu.Name}");
                foreach (var item in menuItem.Menu.Products)
                {
                    result.AppendLine($"  - {item.Name}");
                }
            }

            return result.ToString();
        }

        private async Task SendEmailToClientAsync(Order order, Restaurant restaurant)
        {
            var data = new
            {
                CustomerLastname = order.CustomerLastname,
                CustomerFirstname = order.CustomerFirstname,
                RestaurantName = restaurant.Name,
                RestaurantAddress = restaurant.Address,
                RestaurantSlugId = restaurant.SlugId,
                OrderId = order.OrderId,
                OrderNumber = order.OrderNumber

            };
            await _sendGridEmailSender.SendAsync(order.CustomerEmail, _configuration["SendGrid:OrderTemplateId"], data);

            var dataRestaurant = new
            {
                OrderDate = order.OrderDate.ToString("dd/MM/yyy"),
                RestaurantName = restaurant.Name
            };
            await _sendGridEmailSender.SendAsync(restaurant.Contact.Email, _configuration["SendGrid:OrderRestaurantTemplateId"], dataRestaurant);
        }
    }
}
