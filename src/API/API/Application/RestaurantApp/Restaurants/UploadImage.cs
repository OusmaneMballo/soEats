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
    public class UploadImageCommand : IRequest<string>
    {
        public Guid RestaurateurId { get; set; }
        public Guid RestaurantId { get; set; }
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
             var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.RestaurateurId);

            var fileUrl = await _fileStorageService.Upload(request.RestaurantId, request.FileName, request.ImageFile);
            restaurant.AddOrUpdateImageUrl(fileUrl);
            _documentSession.Update(restaurant);
            await _documentSession.SaveChangesAsync();

            return fileUrl;
        }
    }
}
