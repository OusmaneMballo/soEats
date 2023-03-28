using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        //public static void AddOktaAuthentication(this IServiceCollection services, IConfiguration configuration)
        //{
        //    services.AddAuthentication(options =>
        //    {
        //        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        //    })
        //        .AddJwtBearer(options =>
        //        {
        //            options.Authority = configuration["Okta:Authority"];
        //            options.Audience = configuration["Okta:Audience"];
        //            options.RequireHttpsMetadata = true;
        //        });
        //}

        public static void AddSwagger(this IServiceCollection services, IConfiguration configuration)
        {
            var swaggerConfig = new SwaggerConfig();
            configuration.GetSection("Swagger").Bind(swaggerConfig);

            services.AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(x => x.FullName);
                options.SwaggerDoc(swaggerConfig.Version, new OpenApiInfo
                {
                    Title = swaggerConfig.Title,
                    Version = swaggerConfig.Version,
                });
               
                //var xmlCommentsFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                //var xmlCommentsFileFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFileName);
                //options.IncludeXmlComments(xmlCommentsFileFullPath);

                //options.EnableAnnotations();

                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri(swaggerConfig.OAuth2.AuthorizeUrl),
                            Scopes = swaggerConfig.OAuth2.Scopes.ToDictionary(s => s)
                        }
                    }
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                        },
                        swaggerConfig.OAuth2.Scopes
                    }
                });
            });
        }
    }
}
