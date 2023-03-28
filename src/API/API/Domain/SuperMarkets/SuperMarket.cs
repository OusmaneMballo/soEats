using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class SuperMarket
    {
        public Guid Id { get; set; }
        public string SlugId { get; private set; }
        public Guid OwnerId { get; private set; }
        public string Name { get; set; }
        public string NormalizedName { get; private set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public Contact Contact { get; private set; }
        public string Address { get; private set; }
        public DeliveryMethod TypeDeliveryMethod { get; set; }
        public List<Image> PhotosUrls { get; private set; } = new();
        public List<OpeningHour> OpeningHours { get; private set; } = new();
        public DateTime CreatedAt { get; private set; }

        private SuperMarket()
        {
        }

        public SuperMarket(Guid id, string slugId, Guid ownerId, string name, string normalizedName, string imageUrl, string description, Contact contact, string address, List<OpeningHour> openingHours)
        {
            Id = id;
            SlugId = slugId;
            OwnerId = ownerId;
            Name = name;
            NormalizedName = normalizedName;
            ImageUrl = imageUrl;
            Description = description;
            Contact = contact;
            Address = address;
            OpeningHours = openingHours;
            TypeDeliveryMethod = DeliveryMethod.DeliverByMe;
            CreatedAt = DateTime.UtcNow;
        }

        public enum DeliveryMethod { DeliverByMe, DelegateDeliveryToSoeats }

        internal void Update(string name, string description, Contact contact, string address)
        {
            Description = description ?? Description;
            Name = name ?? Name;
            Contact = contact ?? Contact;
            Address = address ?? Address;
        }

        internal void AddOrUpdateImageUrl(string imageUrl)
        {
            ImageUrl = imageUrl;
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

    }
}
