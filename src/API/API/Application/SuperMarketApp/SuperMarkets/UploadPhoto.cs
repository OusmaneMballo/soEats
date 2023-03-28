using API.Application.Common;
using API.Domain;
using API.Domain.SuperMarkets;
using API.Infrastructure;
using Marten;
using MediatR;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class UploadPhotoCommand : IRequest<(Guid, string)>
    {
        public Guid RestaurateurId { get; set; }
        public Guid SuperMarketId { get; set; }
        public string FileName { get; set; }
        public Stream ImageFile { get; set; }

    }

    public class UploadPhotoCommandHandler : IRequestHandler<UploadPhotoCommand, (Guid, string)>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UploadPhotoCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<(Guid, string)> Handle(UploadPhotoCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMarketId && s.OwnerId == request.RestaurateurId);

            if (superMarket == null)
            {
                throw new Exception($"Not found : {request.SuperMarketId}");
            }

            var fileUrl = await _fileStorageService.Upload(superMarket.Id, request.FileName, request.ImageFile);
            var image = new Image(Guid.NewGuid(), new Uri(fileUrl));

            superMarket.Addphoto(image);
            _documentSession.Store(superMarket);
            await _documentSession.SaveChangesAsync();
            return (image.Id, fileUrl);
        }
    }
}