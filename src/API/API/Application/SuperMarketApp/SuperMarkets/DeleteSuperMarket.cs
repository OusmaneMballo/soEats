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
    public class DeleteSuperMarketCommand : IRequest<Unit>
    {
        public Guid RestaurateurId { get; set; }
        public Guid SuperMarketId { get; set; }
    }

    public class DeleteSuperMarketCommandHandler : IRequestHandler<DeleteSuperMarketCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteSuperMarketCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeleteSuperMarketCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMarketId && s.OwnerId == request.RestaurateurId);
            if (superMarket != null)
            {
                _documentSession.Delete(superMarket);
                await _documentSession.SaveChangesAsync();
            }

            return Unit.Value;
        }
    }
}
