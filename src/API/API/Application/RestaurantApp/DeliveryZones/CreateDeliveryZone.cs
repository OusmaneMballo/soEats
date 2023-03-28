using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.DeliveryZones
{
    public class CreateDeliveryZoneCommand : IRequest<Guid>
    {
        [Required]
        public int ZoneId { get; set; }
        [Required]
        public decimal DeliveryPrice { get; set; }
        [Required]
        public List<string> Zones { get; set; }


    }

    public class CreateDeliveryZoneCommonHandler : IRequestHandler<CreateDeliveryZoneCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;

        public CreateDeliveryZoneCommonHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Guid> Handle(CreateDeliveryZoneCommand request, CancellationToken cancellationToken)
        {
            var deliveryId = new Guid();
            var deliveryZone = new DeliveryZone(deliveryId, request.ZoneId,request.DeliveryPrice,request.Zones);
            _documentSession.Store(deliveryZone);
            await _documentSession.SaveChangesAsync();
            return deliveryId;

        }
    }
}
