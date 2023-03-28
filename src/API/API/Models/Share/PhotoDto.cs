using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
        public record PhotoDto(Guid id,
                               Uri imageUrl)
        {
        }
    
}
