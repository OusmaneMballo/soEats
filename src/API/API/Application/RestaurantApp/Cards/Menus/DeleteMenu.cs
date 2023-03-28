using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Menus
{
    public class DeleteMenuCommand : IRequest<Unit>
    {
        public Guid CardId { get; set; }
        public Guid MenuId { get; set; }


    }
    public class DeleteMenuCommandHandler : IRequestHandler<DeleteMenuCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteMenuCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Unit> Handle(DeleteMenuCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            card.DeleteMenu(request.MenuId);

            _documentSession.Update(card);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
