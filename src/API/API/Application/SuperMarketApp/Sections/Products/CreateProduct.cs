using API.Application.Common;
using API.Domain;
using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections.Products
{
    public class CreateProductCommand : IRequest<Guid>
    {
        [Required]
        public Guid IdSection { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public IFormFile File { get; set; }
    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public CreateProductCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var sectionId = request.IdSection;
            var section = await _documentSession.Query<Section>().FirstOrDefaultAsync(r => r.SuperMarketId == request.IdSuperMarket && r.Id == sectionId);
            var category = await _documentSession.Query<Category>().FirstOrDefaultAsync(c => c.Id == request.CategoryId);
            if (section == null)
            {
                throw new Exception($"section type with id : {sectionId} or ray type with supermarket id : {request.IdSuperMarket}  not found");
            }
            if (category == null)
            {
                throw new Exception($"category type with id : {request.CategoryId} not found");
            }

            var imageUrl = await _fileStorageService.Upload(sectionId, request.File.FileName, request.File.OpenReadStream());
            var productId = Guid.NewGuid();
            var product = new Domain.SuperMarkets.Product(productId, request.IdSuperMarket, request.IdSection, request.Name, request.Price, request.Price, request.Description, category, imageUrl);

            section.AddProduct(product);
            _documentSession.Update(section);

            await _documentSession.SaveChangesAsync();
            
            return productId;
        }
    }
}
