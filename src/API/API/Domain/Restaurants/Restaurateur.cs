using System;
using System.Collections.Generic;

namespace API.Domain
{
    public class Restaurateur
    {

        public Guid Id { get; private set; }
        public string Email { get; private set; }

        private Restaurateur() { }

        public Restaurateur(Guid id, string email)
        {
            Id = id;
            Email = email;
        }
    }
}
