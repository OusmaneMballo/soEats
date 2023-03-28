using API.Domain;
using Marten;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class DeleteProductFromCardCommand : IRequest<Unit>
    {
        public Guid CardId { get; set; }
        public Guid ProductId { get; set; }
        
    }
    public class DeleteProductFromCardCommandHandler : IRequestHandler<DeleteProductFromCardCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteProductFromCardCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Unit> Handle(DeleteProductFromCardCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            card.DeleteCardProduct(request.ProductId);

            _documentSession.Update(card);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
