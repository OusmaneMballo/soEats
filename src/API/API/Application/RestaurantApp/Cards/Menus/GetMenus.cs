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
    public class GetMenusQuery : IRequest<IEnumerable<MenusDto>>
    {
        public Guid CardId { get; set; }
    }
    public class GetMenusQueryHandler : IRequestHandler<GetMenusQuery, IEnumerable<MenusDto>>
    {
        private readonly IQuerySession _querySession;

        public GetMenusQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<MenusDto>> Handle(GetMenusQuery request, CancellationToken cancellationToken)
        {
            var card = await _querySession.Query<Card>().FirstOrDefaultAsync(c => c.Id == request.CardId);

            return card.Menus.Select(m => m.ProjectToMenusDto());
        }

    }
}
