using API.Domain;
using API.Domain.SuperMarkets;
using Marten;
using Marten.Schema;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    [SoftDeleted]
    public class DeletePhotoCommand : IRequest<Unit>
    {
        public Guid RestaurateurId { get; set; }
        public Guid SuperMarketId { get; set; }
        public Guid PhotoId { get; set; }

    }
    public class DeletePhotoCommandHandler : IRequestHandler<DeletePhotoCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeletePhotoCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeletePhotoCommand request, CancellationToken cancellationToken)
        {
            
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMarketId && s.OwnerId == request.RestaurateurId);

            if (superMarket != null)
            {
                superMarket.DeletePhoto(request.PhotoId);
                _documentSession.Update(superMarket);
                await _documentSession.SaveChangesAsync();
            }
            return Unit.Value;
        }
    }
}
