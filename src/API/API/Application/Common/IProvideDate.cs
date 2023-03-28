using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Common
{
    public interface IProvideDate
    {
        public DateTime UtcNow();

    }

    public class UtcDateProvider : IProvideDate
    {
        public DateTime UtcNow()
        {
            return DateTime.UtcNow;
        }
    }
}
