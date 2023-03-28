using API.Domain;
using API.Domain.SuperMarkets;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.SuperMarketApp.SuperMarkets
{
    public class SetOpeningHoursCommand : IRequest<Unit>
    {
        public Guid SuperMarketId { get; set; }
        public int DayOfWeek { get; set; }
        public SlotCommand Slot1 { get; set; }
        public SlotCommand Slot2 { get; set; }

        public class SlotCommand
        {
            public string StartTime { get; set; }
            public string EndTime { get; set; }
        }
    }

    public class SetOpeningHoursCommandHandler : IRequestHandler<SetOpeningHoursCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public SetOpeningHoursCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(SetOpeningHoursCommand request, CancellationToken cancellationToken)
        {
            var superMarket = await _documentSession.Query<SuperMarket>().FirstOrDefaultAsync(s => s.Id == request.SuperMarketId);

            if (superMarket == null)
            {
                throw new Exception("SuperMarket not found");
            }

            var openingHour = superMarket.GetOpeningHour((DayOfWeek)request.DayOfWeek);
            if (openingHour == null)
            {
                openingHour = new OpeningHour(Guid.Empty, (DayOfWeek)request.DayOfWeek);
            }

            openingHour.SetSlot1(request.Slot1.StartTime, request.Slot1.EndTime);
            openingHour.SetSlot2(request.Slot2.StartTime, request.Slot2.EndTime);

            superMarket.AddOrUpdateOpeningHour(openingHour);
            _documentSession.Store(superMarket);

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
