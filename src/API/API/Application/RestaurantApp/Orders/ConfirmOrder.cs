using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Orders
{
    public class ConfirmOrderCommand : IRequest<Unit>
    {
        public Guid OrderId { get; set; }
    }
    public class ConfirmOrderCommandHandler : IRequestHandler<ConfirmOrderCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;

        public ConfirmOrderCommandHandler(IDocumentSession documentSession, ISendEmail sendGridEmailSender, IConfiguration configuration)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
        }

        public async Task<Unit> Handle(ConfirmOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _documentSession.Query<Order>().FirstOrDefaultAsync(o => o.OrderId == request.OrderId);
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == order.RestaurantId);
            if (order != null && restaurant != null)
            {
                order.Confirm();

                if (restaurant.TypeDeliveryMethod == Restaurant.DeliveryMethod.DelegateDeliveryToSoeats && order.OrderDeliveryMethod == Order.DeliveryMethod.ToBeDelivered)
                {
                    await SendEmailToSoaetsAsync(order, restaurant);
                }
                await _documentSession.SaveChangesAsync();

                await SendEmailConfirmationToClientAsync(order, restaurant);
            }

            return Unit.Value;
        }

        private async Task SendEmailConfirmationToClientAsync(Order order, Restaurant restaurant)
        {

            var data = new
            {
                CustomerLastname = order.CustomerLastname,
                CustomerFirstname = order.CustomerFirstname,
                RestaurantName = restaurant.Name,
                RestaurantAddress = restaurant.Address
            };
            await _sendGridEmailSender.SendAsync(order.CustomerEmail, _configuration["SendGrid:ConfirmOrderTemplateId"], data);

        }

        private async Task SendEmailToSoaetsAsync(Order order, Restaurant restaurant)
        {
            var dataSoeats = new
            {
                CustomerLastname = order.CustomerLastname,
                CustomerFirstname = order.CustomerFirstname,
                CustomerAdress = order.CustomerAdress,
                CustomerPhoneNumber = order.CustomerPhoneNumber,
                RestaurantName = restaurant.Name,
                RestaurantAddress = restaurant.Address,
                OrderNumber = order.OrderNumber,
                CustomerZone = order.DeliveryZone
            };
            await _sendGridEmailSender.SendAsync(_configuration["SoEats:ContactEmail"], _configuration["SendGrid:OrderTemplateId"], dataSoeats);

            await _sendGridEmailSender.SendAsync(_configuration["SoEats:DeliverEmail"], _configuration["SendGrid:SoeatsDeliverTemplateId"], dataSoeats);
        }

    }
}
