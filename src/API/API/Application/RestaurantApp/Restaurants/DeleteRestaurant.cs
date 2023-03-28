using API.Domain;
using Marten;
using Marten.Schema;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Restaurants
{
    [SoftDeleted]
    public class DeleteRestaurantCommand : IRequest<Unit>
    {
        public Guid RestaurateurId { get; set; }
        public Guid RestaurantId { get; set; }

    }
    public class DeleteRestaurantCommandHandler : IRequestHandler<DeleteRestaurantCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteRestaurantCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeleteRestaurantCommand request, CancellationToken cancellationToken)
        {
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.RestaurateurId);

            if(restaurant != null)
            {
                _documentSession.Delete(restaurant);
                await _documentSession.SaveChangesAsync();
            }
            return Unit.Value;
        }
    }
}
