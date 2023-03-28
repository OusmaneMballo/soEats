using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.RestaurantCategories
{
    public class CreateRestaurantCategorieCommand : IRequest<Guid>
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public IFormFile ImageFile { get; set; }


        public class CreateRestaurantCategorieCommandHandler : IRequestHandler<CreateRestaurantCategorieCommand, Guid>
        {
            private readonly IDocumentSession _documentSession;
            private readonly IFileStorageService _fileStorageService;
            public CreateRestaurantCategorieCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
            {
                _documentSession = documentSession;
                _fileStorageService = fileStorageService;
            }
            public async Task<Guid> Handle(CreateRestaurantCategorieCommand request, CancellationToken cancellationToken)
            {
                var restaurantCategorieId = Guid.NewGuid();
                var displayName = request.DisplayName;
                var value = Regex.Replace(displayName, @"\s", "").ToLower();
                var imageUrl = await _fileStorageService.Upload(restaurantCategorieId, request.ImageFile.FileName, request.ImageFile.OpenReadStream());
                var restaurantCategorie = new RestaurantCategorie(restaurantCategorieId, displayName, value, imageUrl);
                _documentSession.Store(restaurantCategorie);
                await _documentSession.SaveChangesAsync();

                return restaurantCategorieId;
            }
        }
    }
}
