using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Promotions
{
    public class DeletePromotionCommand : IRequest<Unit>
    {
        [Required]
        public Guid SuperMarketId { get; set; }

        [Required]
        public Guid PromotionId { get; set; }

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
            var promotion = await _documentSession.Query<PromotionSuperMarket>().FirstOrDefaultAsync(p => p.SuperMarketId == request.SuperMarketId && p.Id == request.PromotionId);
            if (promotion != null)
            {
                _documentSession.Delete(promotion);
                await _documentSession.SaveChangesAsync();
            }
            return Unit.Value;
        }
    }
}
