using API.Domain;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Commissions
{
    public class CreateCommissionCommand : IRequest<Guid>
    {
        [Required]
        public decimal Percentage { get; set; }

        [Required]
        public decimal MaximumLevelPrice { get; set; }

        [Required]
        public decimal MinimumLevelPrice { get; set; }


    }

    public class CreateCommissionCommonHandler : IRequestHandler<CreateCommissionCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;

        public CreateCommissionCommonHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }
        public async Task<Guid> Handle(CreateCommissionCommand request, CancellationToken cancellationToken)
        {
            var commissionId = new Guid();
            var commission = new Commission(commissionId, request.Percentage, request.MaximumLevelPrice, request.MinimumLevelPrice);
            _documentSession.Store(commission);
            await _documentSession.SaveChangesAsync();
            return commissionId;

        }
    }
}
