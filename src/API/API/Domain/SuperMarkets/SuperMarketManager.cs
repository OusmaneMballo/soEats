using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class SuperMarketManager
    {
        public Guid Id { get; private set; }
        public string Email { get; private set; }

        private SuperMarketManager()
        { }

        public SuperMarketManager(Guid id, string email)
        {
            Id = id;
            Email = email;
        }
    }
}
