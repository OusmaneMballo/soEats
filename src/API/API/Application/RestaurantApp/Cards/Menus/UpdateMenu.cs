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

namespace API.Application.Cards.Menus
{
    public class UpdateMenuCommand : IRequest<Unit>
    {
        public Guid CardId { get; set; }
        public Guid MenuId { get; set; }
        public string Name { get; set; }

        public decimal Price { get; set; }
        public List<Guid> ProductIds { get; set; } = new();

        public IFormFile File { get; set; }
    }
    public class UpdateMenuCommandHandler : IRequestHandler<UpdateMenuCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UpdateMenuCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<Unit> Handle(UpdateMenuCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(r => r.Id == request.CardId);
            var menu = card.MenusContainsProducts(request.MenuId);
            
            if (request.File != null)
            {
                var fileUrl = await _fileStorageService.Upload(card.Id, request.File.FileName, request.File.OpenReadStream());
                menu.Update(request.Name, request.Price, fileUrl, request.ProductIds);
            }
            else
            {
                menu.Update(request.Name, request.Price, request.ProductIds);
            }

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }



}
