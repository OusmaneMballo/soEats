using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards.Menus
{
    public class GetMenuWithProductsQuery : IRequest<MenuDto>
    {
        public Guid CardId { get; set; }
        public Guid MenuId { get; set; }
    }
    public class GetMenuWithProductsQueryHandler : IRequestHandler<GetMenuWithProductsQuery, MenuDto>
    {
        private readonly IQuerySession _querySession;
        public GetMenuWithProductsQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<MenuDto> Handle(GetMenuWithProductsQuery request, CancellationToken cancellationToken)
        {
            var card = await _querySession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);
            var productTypes = await _querySession.Query<ProductType>().ToListAsync();

            var m =  card.MenusContainsProducts(request.MenuId);
            return m.BuildMenu(card, productTypes);
        }

    }

}
