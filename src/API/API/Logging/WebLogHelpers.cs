using System.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace API.Logging
{
    public static class WebLogHelpers
    {
        public static string GetCorrelationId(HttpContext context)
        {
            return Activity.Current?.Id ?? context.TraceIdentifier;
        }
    }
}