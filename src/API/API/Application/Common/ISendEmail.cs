using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Common
{
    public interface ISendEmail
    {
        Task SendAsync(string toEmail, string templateId, object data, bool shouldAddSoEatsToBcc = true);
    }
}
