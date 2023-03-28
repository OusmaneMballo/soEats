using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections
{
    public class DeleteSectionCommand : IRequest<Unit>
    {
        [Required]
        public Guid IdSuperMarket { get; set; }
        [Required]
        public Guid IdSection { get; set; }
    }

    public class DeleteRayCommandHandler : IRequestHandler<DeleteSectionCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteRayCommandHandler(IDocumentSession documentSession)
        {
            this._documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeleteSectionCommand request, CancellationToken cancellationToken)
        {
            var section = await _documentSession.Query<Section>().FirstOrDefaultAsync(r => r.SuperMarketId == request.IdSuperMarket && r.Id == request.IdSection);
            _documentSession.Delete(section);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
