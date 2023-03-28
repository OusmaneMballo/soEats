using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections.Products
{
    public class DeleteProductCommand : IRequest<Unit>
    {
        public Guid ProductId { get; set; }
        public Guid SectionId { get; set; }
        public Guid SuperMarketId { get; set; }
    }

    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteProductCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var section = await _documentSession.Query<Section>().FirstOrDefaultAsync(s => s.SuperMarketId == request.SuperMarketId && s.Id == request.SectionId);
            section.DeleteSectionProduct(request.ProductId);

            _documentSession.Update(section);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
