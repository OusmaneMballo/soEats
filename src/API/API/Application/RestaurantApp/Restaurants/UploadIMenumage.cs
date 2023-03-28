using API.Application.Common;
using API.Domain;
using API.Infrastructure;
using Marten;
using MediatR;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Restaurants
{
    public class UploadMenuImageCommand : IRequest<(Guid, string)>
    {
        public Guid RestaurateurId { get; set; }
        public Guid RestaurantId { get; set; }
        public string FileName { get; set; }
        public Stream ImageFile { get; set; }
    }

    public class UploadMenuImageCommandHandler : IRequestHandler<UploadMenuImageCommand, (Guid, string)>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UploadMenuImageCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<(Guid, string)> Handle(UploadMenuImageCommand request, CancellationToken cancellationToken)
        {
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.RestaurateurId);
          
            if (restaurant == null)
            {
                throw new Exception($"Not found : {request.RestaurantId}");
            }

            var fileUrl = await _fileStorageService.Upload(restaurant.Id, request.FileName, request.ImageFile);
            var image = new Image(Guid.NewGuid(), new Uri(fileUrl));
            restaurant.AddMenuImage(image);
            _documentSession.Store(restaurant);
            await _documentSession.SaveChangesAsync();
            return (image.Id, fileUrl);
        }
    }
}
