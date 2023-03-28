using API.Domain.SuperMarkets;
using API.Models.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.Categores
{
    public class GetCategoryQuery : IRequest<IEnumerable<CategoryDto>>
    {

    }

    public class GetCategoryQueryHandler : IRequestHandler<GetCategoryQuery, IEnumerable<CategoryDto>>
    {
        private readonly IQuerySession _querySession;
        public GetCategoryQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<CategoryDto>> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            return (await _querySession.Query<Category>()
                                       .ToListAsync())
                                       .Select(c =>c.projectToCategoryDto());
        }
    }
}
