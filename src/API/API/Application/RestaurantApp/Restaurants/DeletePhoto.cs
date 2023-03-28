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
    public class DeletePhotoCommand : IRequest<Unit>
    {
        public Guid RestaurateurId { get; set; }
        public Guid RestaurantId { get; set; }
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
            
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.RestaurateurId);

            if (restaurant != null)
            {
                restaurant.DeletePhoto(request.PhotoId);
                _documentSession.Update(restaurant);
                await _documentSession.SaveChangesAsync();
            }
            return Unit.Value;
        }
    }
}
