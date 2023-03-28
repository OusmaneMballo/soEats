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
    public class CreateCategoryCommand : IRequest<Guid>
    {
        [Required]
        public string DisplayName { get; set; }

        public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, Guid>
        {
            private readonly IDocumentSession _documentSession;

            public CreateCategoryHandler(IDocumentSession documentSession)
            {
                _documentSession = documentSession;
            }

            public async Task<Guid> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
            {
                var categoryId = Guid.NewGuid();
                var displayName = request.DisplayName;
                var value = Regex.Replace(displayName, @"\s", "").ToLower();
                var category = new Category(categoryId, displayName, value);
                _documentSession.Store(category);

                await _documentSession.SaveChangesAsync();

                return categoryId;

            }
        }

    }
}
