using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class AddressDto
    {
        [Required]
        public string AddressLine { get; set; }

        [Required]
        public string City { get; set; }

        public string PostalCode { get; set; }
    }
}
