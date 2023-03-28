using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Common
{
    public interface ISendSMS
    {
        Task SendAsync(string subject, string content, params string[] recipients);
    }
}
