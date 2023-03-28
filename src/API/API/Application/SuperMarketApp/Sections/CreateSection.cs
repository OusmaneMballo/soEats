using API.Application.Common;
using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
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

namespace API.Application.SuperMarketApp.Sections
{
    public class CreateSectionCommand : IRequest<Guid>
    {
        [Required]
        public Guid SuperMarketId { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public List<CategoryDto> Categories { get; set; }
        [Required]
        public IFormFile ImageFile { get; set; }

        public class CreateRayCommandHandler : IRequestHandler<CreateSectionCommand, Guid>
        {
            private readonly IDocumentSession _docummentSession;
            private readonly IFileStorageService _fileStorageService;

            public CreateRayCommandHandler(IDocumentSession docummentSession, IFileStorageService fileStorageService)
            {
                _docummentSession = docummentSession;
                _fileStorageService = fileStorageService;
            }


            public async Task<Guid> Handle(CreateSectionCommand request, CancellationToken cancellationToken)
            {
                var sectionId = Guid.NewGuid();
                var value = Regex.Replace(request.DisplayName, @"\s", "").ToLower();
                var categoriesId = request.Categories.Select(c => c.Id).ToList();
                var imageUrl = await _fileStorageService.Upload(sectionId, request.ImageFile.FileName, request.ImageFile.OpenReadStream());
                var section = new Section(sectionId, request.DisplayName, value, imageUrl, request.SuperMarketId, categoriesId);

                _docummentSession.Store(section);
                await _docummentSession.SaveChangesAsync();
                
                return sectionId;
            }
        }
    }

}
