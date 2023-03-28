using API.Application.Common;
using API.Domain;
using API.Models;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Promotions
{
    public class CreatePromotionCommand : IRequest<Unit>
    {
        [Required]
        public Guid RestaurantId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public double Reduction { get; set; }
        public List<ProductTypeDto> ProductTypes { get; set; }
        public List<Categorie> Categories { get; set; }
        [Required]
        public IFormFile ImageFile { get; set; }

    }
    public class CreatePromotionCommonHandler : IRequestHandler<CreatePromotionCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public CreatePromotionCommonHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }
        public async Task<Unit> Handle(CreatePromotionCommand request, CancellationToken cancellationToken)
        {
            var restaurantId = request.RestaurantId;
            var startDate = request.StartDate;
            var endDate = request.EndDate;
            var productTypes = request.ProductTypes;
            var categories = request.Categories;
            var imageUrl = await _fileStorageService.Upload(restaurantId, request.ImageFile.FileName, request.ImageFile.OpenReadStream());

            var searchRestaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId);

            if (searchRestaurant == null)
            {
                throw new Exception($"Restaurant with id : {request.RestaurantId} not found");
            }

            if (request.Categories.IsEmpty() && productTypes.IsEmpty())
            {
                throw new Exception("Error Category or ProductType is required");
            }

            productTypes?.ForEach((item) =>
            {
                var promotionId = Guid.NewGuid();
                var promotion = new Promotion(promotionId, restaurantId, request.Name, startDate, endDate, request.Reduction, item.Id, Categorie.None, imageUrl);
                _documentSession.Store(promotion);

            });
            categories?.ForEach((item) =>
            {
                var promotionId = Guid.NewGuid();
                var promotion = new Promotion(promotionId, restaurantId, request.Name, startDate, endDate, request.Reduction, Guid.Empty, item, imageUrl);
                _documentSession.Store(promotion);

            });

            await _documentSession.SaveChangesAsync();
            return Unit.Value;
           
        }
    }
}
