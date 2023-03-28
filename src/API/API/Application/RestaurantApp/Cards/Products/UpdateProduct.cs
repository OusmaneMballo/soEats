using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class UpdateProductCommand : IRequest<Unit>
    {
        public Guid CardId { get; set; }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public Categorie Categorie { get; set; }
        public Guid ProductTypeId { get; set; }

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
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            var product = card.GetProduct(request.Id);

            string fileUrl = null;
            if(request.File != null)
            {
               fileUrl = await _fileStorageService.Upload(card.Id, request.File.FileName, request.File.OpenReadStream());
            }
           
            product.Update(request.Name, request.Description, request.Price, request.Categorie, request.ProductTypeId, fileUrl);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
