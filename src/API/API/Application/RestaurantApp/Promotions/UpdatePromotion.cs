using API.Domain;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Promotions
{
    public class UpdatePromotionCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public Guid RestaurantId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Reduction { get; set; }

        public List<ProductType> ProductTypes { get; set; }
        public List<Categorie> Categories { get; set; }

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
            var promotion = await _documentSession.Query<Promotion>().FirstOrDefaultAsync(p => p.RestaurantId == request.RestaurantId && p.Id == request.Id);

            if (request.EndDate < promotion.StartDate)
            {
                throw new Exception("Veuillez renseigner une bonne date");
            }
            if (request.Categories.IsEmpty() && request.ProductTypes.IsEmpty())
            {
                throw new Exception("Error Category or ProductType is required");
            }

            request.ProductTypes.ForEach((item) =>
            {
                promotion.Update(request.RestaurantId, request.Name, request.StartDate, request.EndDate, request.Reduction,
                     item.Id, Categorie.None);

            });
            request.Categories.ForEach((item) =>
            {
                promotion.Update(request.RestaurantId, request.Name, request.StartDate, request.EndDate, request.Reduction,
                      Guid.Empty, item);

            });
          
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
