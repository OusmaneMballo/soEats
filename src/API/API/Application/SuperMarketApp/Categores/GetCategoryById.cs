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

namespace API.Application.SuperMarketApp.Categores
{
    public class GetCategoryByIdQuery : IRequest<CategoryDto>
    {
        [Required]
        public Guid CategoryId;
    }

    public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly IQuerySession _querySession;

        public GetCategoryByIdQueryHandler(IQuerySession querySession)
        {
            _querySession = querySession;
        }

        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var category = await _querySession.Query<Category>().FirstOrDefaultAsync(c => c.Id == request.CategoryId);
            return category.projectToCategoryDto();
        }
    }
}
