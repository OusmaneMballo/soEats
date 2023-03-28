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
    public class UpdatePhotoCommand : IRequest<(Guid, string)>
    {
        public Guid RestaurateurId { get; set; }
        public Guid SuperMerketId { get; set; }
        public Guid PhotoId { get; set; }
        public string FileName { get; set; }
        public Stream ImageFile { get; set; }
    }

    public class UpdatePhotoCommandHandler : IRequestHandler<UpdatePhotoCommand, (Guid, string)>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UpdatePhotoCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<(Guid, string)> Handle(UpdatePhotoCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMerketId && s.OwnerId == request.RestaurateurId);

            if (superMarket == null)
            {
                throw new Exception($"Not found : {request.SuperMerketId}");
            }


            var fileUrl = await _fileStorageService.Upload(superMarket.Id, request.FileName, request.ImageFile);
            var image = new Image(request.PhotoId, new Uri(fileUrl));
            superMarket.PhotosUrls.FirstOrDefault(p => p.Id == request.PhotoId).ImageUrl = image.ImageUrl;
            await _documentSession.SaveChangesAsync();
            return (image.Id, fileUrl);
        }
    }
}