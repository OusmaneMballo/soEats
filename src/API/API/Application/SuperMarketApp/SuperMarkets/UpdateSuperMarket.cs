using API.Domain;
using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class UpdateSuperMarketCommand : IRequest<Unit>
    {
        public Guid SuperMarketId { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public Guid OwnerId { get; set; }
        public string Description { get; set; }
    }

    public class UpdateSuperMarketCommandHandler : IRequestHandler<UpdateSuperMarketCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public UpdateSuperMarketCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(UpdateSuperMarketCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMarketId && s.OwnerId == request.OwnerId);
            var contact = new Contact(request.Email ?? superMarket.Contact.Email, request.PhoneNumber ?? superMarket.Contact.PhoneNumber);

            superMarket.Update(request.Name, request.Description, contact, request.Address);
            await _documentSession.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
