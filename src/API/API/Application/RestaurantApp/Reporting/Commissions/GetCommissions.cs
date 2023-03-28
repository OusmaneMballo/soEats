using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Commissions
{
    public class GetCommissionsQuery : IRequest<IEnumerable<CommissionDto>>
    {
    }

    public class GetCommissionsQueryHandler : IRequestHandler<GetCommissionsQuery, IEnumerable<CommissionDto>>
    {
        private readonly IQuerySession _querySession;

        public GetCommissionsQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }
        public async Task<IEnumerable<CommissionDto>> Handle(GetCommissionsQuery request, CancellationToken cancellationToken)
        {
            return (await _querySession.Query<Commission>()
                                       .ToListAsync())
                                       .Select(c => c.ProjectToCommisionDto());
        }
    }
}
