using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Menus
{
    public class UploadMenuImageCommand : IRequest<string>
    {
        public Guid MenuId { get; set; }
        public Guid CardId { get; set; }
        public string FileName { get; set; }
        public Stream ImageFile { get; set; }
    }

    public class UploadMenuImageCommandHandler : IRequestHandler<UploadMenuImageCommand, string>
    {
        private readonly IDocumentSession _documentSession;
        private readonly IFileStorageService _fileStorageService;

        public UploadMenuImageCommandHandler(IDocumentSession documentSession, IFileStorageService fileStorageService)
        {
            _documentSession = documentSession;
            _fileStorageService = fileStorageService;
        }

        public async Task<string> Handle(UploadMenuImageCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            var menu = card.Menus.SingleOrDefault(m => m.Id == request.MenuId);

            var fileUrl = await _fileStorageService.Upload(request.CardId, request.FileName, request.ImageFile);
            menu.AddOrUpdateImageUrl(fileUrl);
            _documentSession.Update(card);
            await _documentSession.SaveChangesAsync();

            return fileUrl;
        }
    }
}
