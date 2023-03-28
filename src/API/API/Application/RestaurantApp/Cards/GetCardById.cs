using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Cards
{
    public class GetCardByIdQuery : IRequest<CardDto>
    {
        public Guid RestaurantId { get; set; }
    }

    public class GetCardByIdQueryHandler : IRequestHandler<GetCardByIdQuery, CardDto>
    {
        private readonly IQuerySession _querySession;
        public GetCardByIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<CardDto> Handle(GetCardByIdQuery request, CancellationToken cancellationToken)
        {
            var card = await _querySession.Query<Card>().FirstOrDefaultAsync(c => c.RestaurantId == request.RestaurantId);
            var productTypes = await _querySession.Query<ProductType>().ToListAsync();
            if (card == null)
                return null;

            return card.ProjectToCarteDto(productTypes);
        }
    }
}
