using API.Application.Common;
using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Orders
{
    public class ConfirmOrderCommand : IRequest<Unit>
    {
        [Required]
        public Guid IdOrder { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class ConfirmOrderCommandHandler : IRequestHandler<ConfirmOrderCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;

        public ConfirmOrderCommandHandler(IDocumentSession documentSession, IConfiguration configuration, ISendEmail sendGridEmailSender)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
        }

        public async Task<Unit> Handle(ConfirmOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _documentSession.Query<OrderSuperMarket>().FirstOrDefaultAsync(o => o.Id == request.IdOrder);
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == order.SuperMarketId);
            if (order != null && superMarket != null)
            {
                order.Confirm();

                if (superMarket.TypeDeliveryMethod == SuperMarket.DeliveryMethod.DelegateDeliveryToSoeats && order.OrderDeliveryMethod == OrderSuperMarket.DeliveryMethod.ToBeDelivered)
                {
                    await SendEmailToSoaetsAsync(order, superMarket);
                }
                await _documentSession.SaveChangesAsync();

                await SendEmailConfirmationToClientAsync(order, superMarket);
            }

            return Unit.Value;
        }

        private async Task SendEmailConfirmationToClientAsync(OrderSuperMarket order, SuperMarket superMarket)
        {

            var data = new
            {
                CustomerLastname = order.CustomerLastname,
                CustomerFirstname = order.CustomerFirstname,
                RestaurantName = superMarket.Name,
                RestaurantAddress = superMarket.Address
            };
            await _sendGridEmailSender.SendAsync(order.CustomerEmail, _configuration["SendGrid:ConfirmOrderTemplateId"], data);

        }

        private async Task SendEmailToSoaetsAsync(OrderSuperMarket order, SuperMarket superMarket)
        {
            var dataSoeats = new
            {
                CustomerLastname = order.CustomerLastname,
                CustomerFirstname = order.CustomerFirstname,
                CustomerAdress = order.CustomerAdress,
                CustomerPhoneNumber = order.CustomerPhoneNumber,
                RestaurantName = superMarket.Name,
                RestaurantAddress = superMarket.Address,
                OrderNumber = order.OrderNumber,
                CustomerZone = order.DeliveryZone
            };
            await _sendGridEmailSender.SendAsync(_configuration["SoEats:ContactEmail"], _configuration["SendGrid:OrderTemplateId"], dataSoeats);

            await _sendGridEmailSender.SendAsync(_configuration["SoEats:DeliverEmail"], _configuration["SendGrid:SoeatsDeliverTemplateId"], dataSoeats);
        }
    }
}
