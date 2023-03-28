using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Categores
{
    public class UpdateCategoryCommand : IRequest<Unit>
    {
        [Required]
        public Guid IdCategory { get; set; }
        [Required]
        public string DisplayName { get; set; }
    }

    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public UpdateCategoryCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _documentSession.Query<Category>().FirstOrDefaultAsync(c => c.Id == request.IdCategory);
            var value = Regex.Replace(request.DisplayName, @"\s", "").ToLower();

            category.DisplayName = request.DisplayName;
            category.Value = value;

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
