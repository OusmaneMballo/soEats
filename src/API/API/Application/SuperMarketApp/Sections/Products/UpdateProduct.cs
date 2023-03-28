using API.Application.Common;
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
    public class UpdateProductCommand : IRequest<Unit>
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public Guid SectionId { get; set; }
        [Required]
        public Guid SuperMarketId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public IFormFile File { get; set; }
    }

    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UpdateProductCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var section = await _documentSession.Query<Section>().FirstOrDefaultAsync(s => s.SuperMarketId == request.SuperMarketId && s.Id == request.SectionId);
            var category = await _documentSession.Query<Category>().FirstOrDefaultAsync(c => c.Id == request.CategoryId);
            var product = section.getProduct(request.Id);

            if (product == null)
            {
                throw new Exception($"product with id : {request.Id} not found");
            }

            string fileUrl = null;
            if (request.File != null)
            {
                fileUrl = await _fileStorageService.Upload(request.SectionId, request.File.FileName, request.File.OpenReadStream());
            }

            product.Update(request.Name, request.Price, request.Description, category, fileUrl);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
