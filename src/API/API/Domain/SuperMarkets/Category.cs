using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.SuperMarkets
{
    public class Category
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Value { get; set; }

        private Category()
        {
        }

        public Category(Guid id, string displayName, string value)
        {
            Id = id;
            DisplayName = displayName;
            Value = value;
        }
    }
}
