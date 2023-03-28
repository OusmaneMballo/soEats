using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Admin
    {
        public Guid Id { get; private set; }
        public string Email { get; private set; }

        private Admin() { }

        public Admin(Guid id, string email)
        {
            Id = id;
            Email = email;
        }
    }
}
