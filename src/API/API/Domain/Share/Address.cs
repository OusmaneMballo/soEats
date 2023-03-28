namespace API.Domain.Share
{
    public class Address
    {
        public string AddressLine { get; private set; }
        public string PostalCode { get; private set; }
        public string City { get; private set; }

        private Address() { }

        public Address(string addressLine, string postalCode, string city)
        {
            AddressLine = addressLine;
            PostalCode = postalCode;
            City = city;
        }


    }
}