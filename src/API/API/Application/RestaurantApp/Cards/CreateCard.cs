using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards
{
    public class CreateCardCommand : IRequest<Guid>
    {
        [Required]
        public Guid RestaurantId { get; set; }

        [Required(ErrorMessage = "Vous devez saisir le nom de la carte")]
        public string Name { get; set; }
    }

    public class CreateCardCommonHandler : IRequestHandler<CreateCardCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;

        public CreateCardCommonHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Guid> Handle(CreateCardCommand request, CancellationToken cancellationToken)
        {
            var restaurantId = request.RestaurantId;
            var cardId = Guid.NewGuid();

            var searchCard = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.RestaurantId == request.RestaurantId);

            if (searchCard == null)
            {
                var card = new Card(cardId, restaurantId, request.Name);
                _documentSession.Store(card);
                await _documentSession.SaveChangesAsync();
                return cardId;

            }
            return cardId;
            
        }
    }   
}
