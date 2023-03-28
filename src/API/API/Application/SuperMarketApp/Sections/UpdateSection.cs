using API.Application.Common;
using API.Domain.SuperMarkets;
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
    public class UpdateSectionCommand : IRequest<Section>
    {
        [Required]
        public Guid IdSection { get; set; }
        [Required]
        public Guid IdSuperMarket { get; set; }
        public string DisplayName { get; set; }
        public string ImageUrl { get; set; }
        public IFormFile File { get; set; }
    }

    public class UpdateRayCommandHandler : IRequestHandler<UpdateSectionCommand, Section>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UpdateRayCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<Section> Handle(UpdateSectionCommand request, CancellationToken cancellationToken)
        {
            var section = await _documentSession.Query<Section>().FirstOrDefaultAsync(s => s.Id == request.IdSection && s.SuperMarketId == request.IdSuperMarket);

            string fileUrl = null;
            if (request.File != null)
            {
                fileUrl = await _fileStorageService.Upload(section.Id, request.File.FileName, request.File.OpenReadStream());
            }

            var value = Regex.Replace(request.DisplayName, @"\s", "").ToLower();
            section.Update(request.DisplayName, value, fileUrl);

            await _documentSession.SaveChangesAsync();

            return section;
        }
    }
}
