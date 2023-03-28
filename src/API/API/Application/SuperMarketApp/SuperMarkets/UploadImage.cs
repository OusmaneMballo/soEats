using API.Application.Common;
using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class UploadImageCommand : IRequest<string>
    {
        public Guid RestaurateurId { get; set; }
        public Guid SuperMarketId { get; set; }
        public string FileName { get; set; }
        public Stream ImageFile { get; set; }
    }

    public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, string>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UploadImageCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<string> Handle(UploadImageCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(r => r.Id == request.SuperMarketId && r.OwnerId == request.RestaurateurId);

            var fileUrl = await _fileStorageService.Upload(request.SuperMarketId, request.FileName, request.ImageFile);
            superMarket.AddOrUpdateImageUrl(fileUrl);
            _documentSession.Update(superMarket);
            await _documentSession.SaveChangesAsync();

            return fileUrl;
        }

    }
}
