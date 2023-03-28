using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections
{
    public class UpdateListCategoryRayCommand : IRequest<Section>
    {
        [Required]
        public Guid IdRay { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
        [Required]
        public List<Product> ListCategories { get; set; }

    }

    public class UpdateListCategoryRayCommandHandler : IRequestHandler<UpdateListCategoryRayCommand, Section>
    {
        private readonly IDocumentSession _documentSession;

        public UpdateListCategoryRayCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Section> Handle(UpdateListCategoryRayCommand request, CancellationToken cancellationToken)
        {
            var ray = await _documentSession.Query<Section>().FirstOrDefaultAsync(r => r.SuperMarketId == request.IdSuperMarket && r.Id == request.IdRay);
            if(ray != null)
            {
                var listCategoriesId = request.ListCategories.Select(c => c.Id).ToList();
                ray.UpdateListCategory(listCategoriesId);

                await _documentSession.SaveChangesAsync();
            }

            return ray;
        }
    }
}
