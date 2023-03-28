using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Menus
{
    public class CreateMenuCommand : IRequest<Guid>
    {
        [Required]
        public Guid CardId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public IFormFile File { get; set; }

        public List<Guid> ProductIds { get; set; }

    }
    public class CreateMenuCommandHandler : IRequestHandler<CreateMenuCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;


        public CreateMenuCommandHandler(IDocumentSession documentSession,IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }
        public async Task<Guid> Handle(CreateMenuCommand request, CancellationToken cancellationToken)
        {
            var menuId = Guid.NewGuid();
            var cardId = request.CardId;
            var imageUrl = await _fileStorageService.Upload(cardId, request.File.FileName, request.File.OpenReadStream());

            var menu = new Menu(menuId, cardId, request.Name, request.Price, imageUrl, request.ProductIds);

            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            card.AddMenu(menu);
            await _documentSession.SaveChangesAsync();
            return menuId;
        }
    }
}
