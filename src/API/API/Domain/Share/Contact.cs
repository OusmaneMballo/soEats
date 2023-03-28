namespace API.Domain
{
    public class Contact
    {
        public string Email { get; private set; }
        public string PhoneNumber { get; private set; }

        private Contact() { }

        public Contact(string email, string phoneNumber)
        {
            Email = email;
            PhoneNumber = phoneNumber;
        }

    }
}