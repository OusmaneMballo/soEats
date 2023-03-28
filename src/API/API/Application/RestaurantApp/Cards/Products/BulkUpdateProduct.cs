using API.Application.Common;
using API.Domain;
using API.Models;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Products
{
    public class BulkUpdateProductCommand : IRequest<Unit>
    {
        public Guid CardId { get; set; }
        public List<ProductDto> Products { get; set; }
    }

    public class BulkUpdateProductCommandHandler : IRequestHandler<BulkUpdateProductCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;
        public BulkUpdateProductCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(BulkUpdateProductCommand request, CancellationToken cancellationToken)
        {
            var card = await _documentSession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            var products = request.Products;

            if (card == null)
            {
                throw new Exception($"card with id : {request.CardId} not found");
            }

            products.ForEach(p =>
            {
                var productToUpdate = card.Products.FirstOrDefault(pro => pro.Id == p.Id);
                if(productToUpdate != null)
                {
                    productToUpdate.Update(p.Name, p.Description, p.Price, p.Categorie, p.ProductType.Id, p.ImageUrl);
                }
            });

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
