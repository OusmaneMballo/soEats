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
    public class AddProductsToMenuCommand : IRequest<Unit>
    {
        public Guid MenuId { get; set; }
        public Guid ProductId { get; set; }
        public Guid CardId { get; set; }
    }

    public class AddProductsToMenuCommandHandler : IRequestHandler<AddProductsToMenuCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public AddProductsToMenuCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Unit> Handle(AddProductsToMenuCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            card.AddProductToMenu(request.MenuId,request.ProductId);

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
