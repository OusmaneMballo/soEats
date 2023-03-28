using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Promotions
{
    public class DeletePromotionCommand : IRequest<Unit>
    {
        public Guid PromotionId { get; set; }
        public Guid RestaurantId { get; set; }
    }
    public class DeletePromotionCommandHandler : IRequestHandler<DeletePromotionCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeletePromotionCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeletePromotionCommand request, CancellationToken cancellationToken)
        {
            var promotion = await _documentSession.Query<Promotion>().FirstOrDefaultAsync(p => p.Id == request.PromotionId && p.RestaurantId == request.RestaurantId);

            if (promotion != null)
            {
                _documentSession.Delete(promotion);
                await _documentSession.SaveChangesAsync();
            }
            return Unit.Value;
        }
    }
}
