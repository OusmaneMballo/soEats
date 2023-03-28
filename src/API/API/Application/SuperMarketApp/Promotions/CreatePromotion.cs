using API.Application.Common;
using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Promotions
{
    public class CreatePromotionCommand : IRequest<Unit>
    {
        [Required]
        public Guid SuperMarketId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public double Reduction { get; set; }
        public List<CategoryDto> Categories { get; set; }
        [Required]
        public IFormFile ImageFile { get; set; }
    }

    public class CreatePromotionCommandHandler : IRequestHandler<CreatePromotionCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public CreatePromotionCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<Unit> Handle(CreatePromotionCommand request, CancellationToken cancellationToken)
        {
            var superMarketId = request.SuperMarketId;
            var startDate = request.StartDate;
            var endDate = request.EndDate;
            var categores = request.Categories;
            var imageUrl = await _fileStorageService.Upload(superMarketId, request.ImageFile.FileName, request.ImageFile.OpenReadStream());

            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMarketId);

            if (superMarket == null)
            {
                throw new Exception($"SuperMarket with id : {request.SuperMarketId} not found");
            }

            if (categores.IsEmpty())
            {
                throw new Exception("Error Category or ProductType is required");
            }

            categores?.ForEach((item) =>
            {
                var promotionId = Guid.NewGuid();
                var promotion = new PromotionSuperMarket(promotionId, superMarketId, request.Name, startDate, endDate, request.Reduction, item.Id, imageUrl);
                _documentSession.Store(promotion);

            });

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
