using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain
{
    public class ProductType
    {
        public Guid Id { get; private set; }
        public string DisplayName { get; private set; }
        public string Value { get; private set; }
        private ProductType()
        {
        }

        public ProductType(Guid id, string displayName, string value)
        {
            Id = id;
            DisplayName = displayName;
            Value = value;
        }
    }
}
