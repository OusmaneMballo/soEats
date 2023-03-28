using API.Application.Common;
using API.Domain.SuperMarkets;
using Microsoft.Extensions.Configuration;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using static API.Domain.SuperMarkets.OrderSuperMarket;

namespace API.Application.SuperMarketApp.Orders
{
    public class CreateOrderCommand : IRequest<Guid>
    {
        [Required]
        public Guid SuperMarketId { get; set; }
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
        public DeliveryMethod OrderDeliveryMethod { get; set; }
    }

    public class CreateOrderCommandHadler : IRequestHandler<CreateOrderCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;
        private readonly ISendSMS _smsSender;

        public CreateOrderCommandHadler(IDocumentSession documentSession, IConfiguration configuration, ISendEmail sendGridEmailSender, ISendSMS smsSender)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
            _smsSender = smsSender;
        }

        public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(r => r.Id == request.SuperMarketId);
            var orderId = Guid.Empty;
            if (superMarket != null)
            {
                orderId = Guid.NewGuid();

                var order = new OrderSuperMarket(orderId, request.SuperMarketId, request.Amount, request.CustomerFirstname,
                                 request.CustomerLastname, request.CustomerPhoneNumber, request.CustomerEmail,
                                 request.CustomerAdress, request.OrderDate, request.DeliveryZone, request.DeliveryPrice, request.Remark,
                                 request.OrderProductItems, request.OrderDeliveryMethod);

                _documentSession.Store(order);

                await _documentSession.SaveChangesAsync();

                await SendEmailToClientAsync(order, superMarket);
               await SendSMSToRestaurant(order, superMarket);
               await SendSMSToClient(order, superMarket);
            }

            return orderId;
        }

        private async Task SendSMSToRestaurant(OrderSuperMarket order, SuperMarket superMarket)
        {
            var subject = "Réception commande So Eats";
            var content = $"Hello {superMarket.Name}, vous venez de recevoir la commande numéro {order.OrderNumber} " +
                $"du client {order.CustomerFirstname} {order.CustomerLastname} ({order.CustomerPhoneNumber} à {order.CustomerAdress}). " +
                $"Mode de livraison : {(order.OrderDeliveryMethod == DeliveryMethod.ToBeDelivered ? "à Livrer" : " à Emporter")}" +
                $"Merci de traiter la commande depuis l’interface So Eats : \n" +
                $"{BuildSmsContent(order)}";

            await _smsSender.SendAsync(subject, content, superMarket.Contact.PhoneNumber, _configuration["SoEats:PhoneNumber"]);
        }

        private async Task SendSMSToClient(OrderSuperMarket order, SuperMarket superMarket)
        {
            var subject = "Réception commande So Eats";
            var content = $"Hello {order.CustomerFirstname} {order.CustomerLastname}, votre commande numéro {order.OrderNumber} vient d'être transmise au restaurant {superMarket.Name}.\n" +
                $"Merci de contacter notre service client au {_configuration["SoEats:PhoneNumber"]} pour toute question.\n" +
                $"Détails de votre commande : \n" +
                $"{BuildSmsContent(order)}";

            await _smsSender.SendAsync(subject, content, order.CustomerPhoneNumber);
        }

        private string BuildSmsContent(OrderSuperMarket order)
        {
            var result = new StringBuilder();

            foreach (var productItem in order.OrderProductItems)
            {
                result.AppendLine($"- {productItem.Quantity} x {productItem.Product.Name}");
            }

            return result.ToString();
        }

        private async Task SendEmailToClientAsync(OrderSuperMarket order, SuperMarket superMarket)
        {
            var data = new
            {
                CustomerLastname = order.CustomerLastname,
                CustomerFirstname = order.CustomerFirstname,
                RestaurantName = superMarket.Name,
                RestaurantAddress = superMarket.Address,
                RestaurantSlugId = superMarket.SlugId,
                OrderId = order.Id,
                OrderNumber = order.OrderNumber

            };
            await _sendGridEmailSender.SendAsync(order.CustomerEmail, _configuration["SendGrid:OrderTemplateId"], data);

            var dataSuperMarket = new
            {
                OrderDate = order.OrderDate.ToString("dd/MM/yyy"),
                RestaurantName = superMarket.Name
            };
            await _sendGridEmailSender.SendAsync(superMarket.Contact.Email, _configuration["SendGrid:OrderRestaurantTemplateId"], dataSuperMarket);
        }

    }
}
