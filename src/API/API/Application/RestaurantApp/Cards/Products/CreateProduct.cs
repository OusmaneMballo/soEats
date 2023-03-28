using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class CreateProductCommand : IRequest<Guid>
    {
        [Required]
        public Guid CardId { get; set; }
        [Required]
        public Guid ProductTypeId { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public Categorie Categorie { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
    public class CreateProductCommonHandler : IRequestHandler<CreateProductCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public CreateProductCommonHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;

        }
        public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var productId = Guid.NewGuid();
            var cardId = request.CardId;
            var imageUrl = await _fileStorageService.Upload(cardId, request.File.FileName, request.File.OpenReadStream());
            var productType = await _documentSession.Query<ProductType>().FirstOrDefaultAsync(p => p.Id == request.ProductTypeId);
            if (productType == null)
            {
                throw new Exception($"product type with id : {request.ProductTypeId} not found");
            }

            var product = new Product(productId, cardId,request.Name, imageUrl, request.Price, request.Price, request.Description, request.Categorie, request.ProductTypeId);
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            card.AddProduct(product);

            _documentSession.Update(card);
            await _documentSession.SaveChangesAsync();

            return productId;
        }
    }
}
