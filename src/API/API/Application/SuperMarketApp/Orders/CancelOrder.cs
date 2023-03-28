using API.Application.Common;
using API.Domain.SuperMarkets;
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
    public class CancelOrderCommand : IRequest<Unit>
    {
        [Required]
        public Guid IdOrder { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
    }

    public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IConfiguration _configuration;
        private readonly Common.ISendEmail _sendGridEmailSender;

        public CancelOrderCommandHandler(IDocumentSession documentSession, IConfiguration configuration, ISendEmail sendGridEmailSender)
        {
            _documentSession = documentSession;
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
        }

        public async Task<Unit> Handle(CancelOrderCommand request, CancellationToken cancellationToken)
        {

            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.IdSuperMarket);
            var order = await _documentSession.Query<OrderSuperMarket>().FirstOrDefaultAsync(o => o.Id == request.IdOrder);
            if (order != null && superMarket != null)
            {
                order.Cancel();

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
            await _sendGridEmailSender.SendAsync(order.CustomerEmail, _configuration["SendGrid:CancelOrderTemplateId"], data);

        }
    }
}
