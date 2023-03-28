using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Sections
{
    public class GetSectionsBySuperMarketIdQuery : IRequest<IEnumerable<SectionDto>>
    {
        [Required]
        public Guid SuperMarketId { get; set; }
    }

    public class GetRaysQueryHandler : IRequestHandler<GetSectionsBySuperMarketIdQuery, IEnumerable<SectionDto>>
    {
        private readonly IQuerySession _querySession;

        public GetRaysQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<IEnumerable<SectionDto>> Handle(GetSectionsBySuperMarketIdQuery request, CancellationToken cancellationToken)
        {
            var categories = await _querySession.Query<Category>().ToListAsync();

            return (
                        await _querySession.Query<Section>().Where(r => r.SuperMarketId == request.SuperMarketId).ToListAsync()
                    ).Select(ray => ray.ProjectToSectionDto(categories));
        }
    }
}
