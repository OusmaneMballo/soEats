using API.Domain;
using API.Models;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static API.Domain.Restaurant;

namespace API.Application.Restaurants
{
    public class UpdateRestaurantCommand : IRequest<Unit>
    {
        public Guid RestaurantId { get; set; }

        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        public string Name { get; set; }

        public Guid OwnerId { get; set; }

        public string Description { get; set; }
        public DeliveryMethod TypeDeliveryMethod { get; set; }

/*        public List<RestaurantCategorieDto> RestaurantCategories { get; set; }
*/
    }
    public class UpdateRestaurantCommandHandler : IRequestHandler<UpdateRestaurantCommand, Unit>
    {
        private readonly IDocumentSession _documentSession;

        public UpdateRestaurantCommandHandler(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Unit> Handle(UpdateRestaurantCommand request, CancellationToken cancellationToken)
        {
            var restaurant = await _documentSession.Query<Restaurant>().FirstOrDefaultAsync(r => r.Id == request.RestaurantId && r.OwnerId == request.OwnerId) ;
            var contact = new Contact(request.Email ?? restaurant.Contact.Email, request.PhoneNumber ?? restaurant.Contact.PhoneNumber);

            restaurant.Update(request.Name, request.Description, contact, request.Address, request.TypeDeliveryMethod);

            await _documentSession.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
