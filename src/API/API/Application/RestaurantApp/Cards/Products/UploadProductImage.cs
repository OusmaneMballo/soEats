using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class UploadProductImageCommand : IRequest<string>
    {
        public Guid CardId { get; set; }
        public Guid ProductId { get; set; }

        public string FileName { get; set; }
        public Stream ImageFile { get; set; }
    }
    public class UploadProductImageCommandHandler : IRequestHandler<UploadProductImageCommand, string>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UploadProductImageCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<string> Handle(UploadProductImageCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            var product = card.Products.SingleOrDefault(c => c.Id == request.ProductId);

            var fileUrl = await _fileStorageService.Upload(request.CardId, request.FileName, request.ImageFile);
            product.AddOrUpdateImageUrl(fileUrl);
            await _documentSession.SaveChangesAsync();

            return fileUrl;
        }
    }
}
