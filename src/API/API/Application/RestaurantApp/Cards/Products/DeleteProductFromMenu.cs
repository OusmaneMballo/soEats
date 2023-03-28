using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class DeleteProductFromMenuCommand : IRequest<Unit>
    {
        public Guid CardId { get; set; }
        public Guid MenuId { get; set; }
        public Guid ProductId { get; set; }
        
    }

    public class DeleteProductFromMenuCommandHandler : IRequestHandler<DeleteProductFromMenuCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteProductFromMenuCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Unit> Handle(DeleteProductFromMenuCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            card.DeleteMenuProduct(request.MenuId, request.ProductId);

            _documentSession.Update(card);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
