using API.Domain;
using Marten;
using Marten.Schema;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Reservations
{
    [SoftDeleted]
    public class DeleteReservationCommand : IRequest<Unit>
    {
        public Guid RestaurantId { get; set; }
        public Guid Id { get; set; }

    }
    public class DeleteReservationCommandHandler : IRequestHandler<DeleteReservationCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteReservationCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeleteReservationCommand request, CancellationToken cancellationToken)
        {
            var reservaion = await _documentSession.Query<Reservation>().FirstOrDefaultAsync(r => r.RestaurantId == request.RestaurantId && r.Id == request.Id);

            if (reservaion != null)
            {
                if (reservaion.ReservationStatus.GetHashCode() == 0)
                {
                    _documentSession.Delete(reservaion);
                }
            }
            await _documentSession.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
