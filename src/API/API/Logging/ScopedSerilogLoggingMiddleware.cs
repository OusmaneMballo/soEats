using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Serilog.Context;

namespace API.Logging
{
    public class ScopedSerilogLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public ScopedSerilogLoggingMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task Invoke(HttpContext httpContext, ILogger<ScopedSerilogLoggingMiddleware> logger)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            string correlationId = WebLogHelpers.GetCorrelationId(httpContext);
            using (LogContext.PushProperty("CorrelationId", correlationId))
            {
                await _next.Invoke(httpContext);
            }
        }
    }
}
