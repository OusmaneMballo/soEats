using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.RestaurantCategories
{
    public class UpdateRestaurantCategorieCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public IFormFile File { get; set; }
    }

    public class UpdateRestaurantCategorieCommandHandler : IRequestHandler<UpdateRestaurantCategorieCommand>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UpdateRestaurantCategorieCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }
        public async Task<Unit> Handle(UpdateRestaurantCategorieCommand request, CancellationToken cancellationToken)
        {
            var restaurantCategorie = await _documentSession.Query<RestaurantCategorie>().FirstOrDefaultAsync(c => c.Id == request.Id);
            if(restaurantCategorie!=null && request.File!=null)
            {
                var fileUrl = await _fileStorageService.Upload(restaurantCategorie.Id, request.File.FileName, request.File.OpenReadStream());
                restaurantCategorie.UpdateRestaurantCategorieImage(fileUrl);
               await  _documentSession.SaveChangesAsync();
            }
            return Unit.Value;
        }
    }
}
