using API.Domain;
using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class CreateSuperMarketCommand : IRequest<Guid>
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public Guid OwnerId { get; set; }

        public string Description { get; set; }
    }

    public class CreateSuperMarketCommandHandler : IRequestHandler<CreateSuperMarketCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;

        public CreateSuperMarketCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Guid> Handle(CreateSuperMarketCommand request, CancellationToken cancellationToken)
        {
            var superMarketId = Guid.NewGuid();
            var contact = new Contact(request.Email, request.PhoneNumber);
            var imageUrl = "";
            var normalizedName = request.Name.ToLowerInvariant().Trim().Replace("'", "").Replace(" ", "-");
            var slugId = $"{normalizedName}-{superMarketId.GetUniqueString()}";
            var opennigHours = new List<OpeningHour>();
            var superMarket = new SuperMarket(superMarketId, slugId, request.OwnerId, request.Name, normalizedName, imageUrl, request.Description, contact, request.Address, opennigHours);

            _documentSession.Store(superMarket);
            await _documentSession.SaveChangesAsync();

            return superMarketId;
        }
    }
}
