using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace API.Application.Cards.ProductsType
{
    public class CreateProductTypeCommand : IRequest<Guid>
    {
     
        [Required]
        public string DisplayName { get; set; }

        public class CreateProductTypeCommandHandler : IRequestHandler<CreateProductTypeCommand, Guid>
        {
            private readonly IDocumentSession _documentSession;
            public CreateProductTypeCommandHandler(IDocumentSession documentSession)
            {
                _documentSession = documentSession;
            }
            public async Task<Guid> Handle(CreateProductTypeCommand request, CancellationToken cancellationToken)
            {
                var productTypeId = Guid.NewGuid();
                var displayName = request.DisplayName;
                var value = Regex.Replace(displayName, @"\s", "").ToLower();
                var productType = new ProductType(productTypeId, displayName, value);
                _documentSession.Store(productType);
                await _documentSession.SaveChangesAsync();

                return productTypeId;
            }
        }

    }
}
