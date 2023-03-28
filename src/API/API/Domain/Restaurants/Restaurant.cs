using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Domain
{
    public class Restaurant
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string NormalizedName { get; private set; }
        public string SlugId { get; private set; }
        public Guid OwnerId { get; private set; }
        public Contact Contact { get; private set; }
        public string ImageUrl { get; private set; }

        public string Description { get; set; }
        public string Address { get; private set; }

        public DateTime CreatedAt { get; private set;  }

        public List<Image> MenuImagesUrls { get; private set; } = new();

        public List<Image> PhotosUrls { get; private set; } = new();

        public List<OpeningHour> OpeningHours { get; private set; } = new();
        public DeliveryMethod TypeDeliveryMethod { get; set; }

        public List<Guid> RestaurantCategories { get; set; }


        private Restaurant() { }

        public Restaurant(Guid id, Guid ownerId, string name, string normalizedName, string slugId, Contact contact, string imageUrl, string address, List<OpeningHour> openingHours, List<Guid> restaurantCategories)
        {
            Id = id;
            Name = name;
            NormalizedName = normalizedName;
            SlugId = slugId;
            OwnerId = ownerId;
            Contact = contact;
            ImageUrl = imageUrl;
            Address = address;
            CreatedAt = DateTime.UtcNow;
            OpeningHours = openingHours;
            TypeDeliveryMethod = DeliveryMethod.DeliverByMe;
            RestaurantCategories = restaurantCategories;
        }

        internal void AddOrUpdateImageUrl(string imageUrl)
        {
            ImageUrl = imageUrl;
        }

        internal void UpdateCategories(Guid restaurantCategories)
        {
            RestaurantCategories.Add(restaurantCategories);
        }

        internal void Update(string name, string description, Contact contact, string address, DeliveryMethod typeDeliveryMethod)
        {
            Description = description ?? Description;
            Name = name ?? Name;
            Contact = contact ?? Contact;
            Address = address ?? Address;
            TypeDeliveryMethod = typeDeliveryMethod;
/*            RestaurantCategories = restauraurantCategories;
*/
        }
        internal void AddMenuImage(Image image)
        {
            MenuImagesUrls.Add(image);
        }

        internal void Addphoto(Image image)
        {
            PhotosUrls.Add(image);
        }

        internal void Updatephoto(Image image)
        {
            PhotosUrls.Add(image);
        }

        internal void DeletePhoto(Guid photoId)
        {
            var photo = PhotosUrls.SingleOrDefault(r => r.Id == photoId);
            PhotosUrls.Remove(photo);
        }

        internal OpeningHour GetOpeningHour(DayOfWeek dayOfWeek)
        {
            return OpeningHours.FirstOrDefault(o => o.DayOfWeek == dayOfWeek);
        }

        internal void AddOrUpdateOpeningHour(OpeningHour openingHour)
        {
            var currentOpeningHour = GetOpeningHour(openingHour.DayOfWeek);
            if (currentOpeningHour == null)
            {
                OpeningHours.Add(openingHour);
            }
            else
            {
                currentOpeningHour = openingHour;
            }
        }

        public bool IsFullyConfigured()
        {
            if (string.IsNullOrEmpty(Description))
                return false;

            if (string.IsNullOrEmpty(ImageUrl))
                return false;

            if (PhotosUrls == null || !PhotosUrls.Any())
                return false;

            if (OpeningHours == null && !OpeningHours.Any())
                return false;

            return true;
        }
        public enum DeliveryMethod { DeliverByMe, DelegateDeliveryToSoeats }
    }
}
