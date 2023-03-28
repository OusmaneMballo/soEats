using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain;
using API.Infrastructure;
using API.Models;
using Marten;
using MediatR;
using System.Linq;

namespace API.Application.Restaurants
{
    public class CreateRestaurantCommand : IRequest<Guid>
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public List<RestaurantCategorie> RestaurantCategories { get; set; }

        [Required]
        public string Name { get; set; }

        public Guid OwnerId { get; set; }

        public string Description { get; set; }
    }

    public class CreateRestaurantCommanHandler : IRequestHandler<CreateRestaurantCommand, Guid>
    {
        private readonly IDocumentSession _documentSession;

        public CreateRestaurantCommanHandler( IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<Guid> Handle(CreateRestaurantCommand request, CancellationToken cancellationToken)
        {
            var restaurantId = Guid.NewGuid();
            var contact = new Contact(request.Email, request.PhoneNumber);
            var imageUrl = "";
            var normalizedName = request.Name.ToLowerInvariant().Trim().Replace("'", "").Replace(" ", "-");
            var slugId = $"{normalizedName}-{restaurantId.GetUniqueString()}";
            var hopennigHours = new List<OpeningHour>();
            var restaurantCategories = request.RestaurantCategories;
            if (restaurantCategories == null)
            {
                throw new Exception($"restaurantCategories  not found");
            }

            List<Guid> listGuidRestaurantCategories=new();
            restaurantCategories.ForEach((item) => { listGuidRestaurantCategories.Add(item.Id); });

            var restaurant = new Restaurant(restaurantId, request.OwnerId, request.Name, normalizedName, slugId, contact, imageUrl, request.Address, hopennigHours, listGuidRestaurantCategories);
            _documentSession.Store(restaurant);
            await _documentSession.SaveChangesAsync();

            var cardId = Guid.NewGuid();
            var card = new Card(cardId, restaurantId, request.Name);
            _documentSession.Store(card);
            await _documentSession.SaveChangesAsync();
            
            return restaurantId;
        }
    }
}
