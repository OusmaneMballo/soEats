using System;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Infrastructure;
using Marten;
using MediatR;

namespace API.Application.Restaurants
{
    public class SetOpeningHoursCommand : IRequest<Unit>
    {
        public Guid RestaurateurId { get; set; }
        public Guid RestaurantId { get; set; }
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
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.RestaurateurId);

            if (restaurant == null)
            {
                throw new Exception("Restaurant not found");
            }

            var openingHour = restaurant.GetOpeningHour((DayOfWeek)request.DayOfWeek);
            if (openingHour == null)
            {
                openingHour = new OpeningHour(Guid.Empty, (DayOfWeek)request.DayOfWeek);
            }

            openingHour.SetSlot1(request.Slot1.StartTime, request.Slot1.EndTime);
            openingHour.SetSlot2(request.Slot2.StartTime, request.Slot2.EndTime);

            restaurant.AddOrUpdateOpeningHour(openingHour);
             _documentSession.Store(restaurant);

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
