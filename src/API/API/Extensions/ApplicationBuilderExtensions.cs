using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Microsoft.AspNetCore.Builder
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSwagger(this IApplicationBuilder app, IConfiguration configuration)
        {
            var swaggerConfig = new SwaggerConfig();
            configuration.GetSection("Swagger").Bind(swaggerConfig);

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", swaggerConfig.Title);

                options.OAuthClientId(swaggerConfig.OAuth2.ClientId);
                options.OAuthAppName($"{swaggerConfig.Title} - Swagger");
                options.OAuthAdditionalQueryStringParams(new Dictionary<string, string>
                {
                    {"nonce", Guid.NewGuid().ToString()}
                });

            });

            return app;
        }

        public static IApplicationBuilder UseRedirectToSwagger(this IApplicationBuilder app)
        {
            var option = new RewriteOptions();
            option.AddRedirect("^$", "swagger");
            app.UseRewriter(option);

            return app;
        }

        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            return app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Run(async context =>
                {
                    var errorId = Guid.NewGuid().ToString();

                    var logger = loggerFactory.CreateLogger("Global exception logger");

                    var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();

                    var errorMessage = exceptionHandlerFeature?.Error.Message;

                    var errorResponse = new
                    {
                        ErrorId = errorId,
                        Message = errorMessage
                    };

                    var jsonResponse = JsonSerializer.Serialize(errorResponse);

                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(jsonResponse, Encoding.UTF8);
                });
            });
        }
    }
}
