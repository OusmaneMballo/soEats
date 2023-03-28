using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Categores
{
    public class DeleteCategoryCommand : IRequest<Unit>
    {
        [Required]
        public Guid IdCategory { get; set; }
    }

    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public DeleteCategoryCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _documentSession.Query<Category>().FirstOrDefaultAsync(c => c.Id == request.IdCategory);

            _documentSession.Delete(category);
            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
