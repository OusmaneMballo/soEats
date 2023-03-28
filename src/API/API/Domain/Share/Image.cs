using System;

namespace API.Domain
{
    public class Image
    {
        public Guid Id { get; private set; }

        public Uri ImageUrl { get; set; }

        private Image() { }

        public Image(Guid id, Uri imageUrl)
        {
            Id = id;
            ImageUrl = imageUrl;
        }
    }
}