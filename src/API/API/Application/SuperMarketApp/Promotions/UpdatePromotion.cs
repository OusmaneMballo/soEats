using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
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
    public class UpdatePromotionCommand : IRequest<Unit>
    {
        public Guid Id { get;  set; }
        public Guid SuperMarketId { get;  set; }
        public string Name { get;  set; }
        [Required]
        public DateTime StartDate { get;  set; }
        [Required]
        public DateTime EndDate { get;  set; }
        public double Reduction { get;  set; }
        public List<Category> Categories { get;  set; }
    }

    public class UpdatePromotionCommandHandler : IRequestHandler<UpdatePromotionCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public UpdatePromotionCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(UpdatePromotionCommand request, CancellationToken cancellationToken)
        {
            var promotion = await _documentSession.Query<PromotionSuperMarket>().FirstOrDefaultAsync(p => p.SuperMarketId == request.SuperMarketId && p.Id == request.Id);

            if (request.EndDate < promotion.StartDate)
            {
                throw new Exception("Veuillez renseigner une bonne date");
            }
            if (request.Categories == null)
            {
                throw new Exception("Error Category is required");
            }

            request.Categories.ForEach((item) =>
            {
                promotion.Update(request.Name, request.StartDate, request.EndDate, request.Reduction, item.Id);

            });


            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
