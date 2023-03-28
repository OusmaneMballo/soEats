using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using API.Application.Common;
using API.Authorization;
using API.Domain;
using API.Infrastructure;
using API.Logging;
using API.Models;
using API.Services;
using Marten;
using Marten.Schema;
using Marten.Storage;
using MediatR;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Graph.Auth;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using SendGrid.Extensions.DependencyInjection;
using Serilog;

namespace API
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // Très important car Microsoft fait son propre mapping qui n'est pas standard
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://localhost:44361",
                                                          "http://localhost:4200")
                                                         .AllowAnyHeader()
                                                         .AllowAnyMethod();
                                  });
            });

            // services.AddResponseCaching();
            services.AddControllers();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAdB2C"));

            services.AddSingleton(CreateGraphServiceClient());
            services.AddSingleton<B2CUserService>();
            services.AddSingleton<IFileStorageService, AzureStorageAccountService>();
            services.AddSingleton<IProvideDate, UtcDateProvider>();
           
            services.AddSwagger(Configuration);
            

            services.AddControllers(o =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                o.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddSendGrid(options => options.ApiKey = Configuration["SendGrid:ApiKey"]);
            services.AddTransient<ISendEmail, SendGridEmailSender>();
            services.AddScoped<ISendSMS, OrangeSMSSender>();

            services.AddMediatR(Assembly.GetExecutingAssembly());

            var options = BuildStoreOptions();
            services.AddMarten(options).BuildSessionsWith<CustomSessionFactory>();

            services.AddApplicationInsightsTelemetry();
            services.AddTransient<RequestBodyLoggingMiddleware>();
            services.AddTransient<ResponseBodyLoggingMiddleware>();
        }

        private GraphServiceClient CreateGraphServiceClient()
        {
            var azureB2CSettings = new AzureB2CSettings();
            Configuration.GetSection("AzureAdB2C").Bind(azureB2CSettings);
            var confidentialClientApplication = ConfidentialClientApplicationBuilder
                                                        .Create(azureB2CSettings.ClientId)
                                                        .WithTenantId(azureB2CSettings.Domain)
                                                        .WithClientSecret(azureB2CSettings.ClientSecret)
                                                        .Build();

            ClientCredentialProvider authProvider = new ClientCredentialProvider(confidentialClientApplication);

            GraphServiceClient graphClient = new GraphServiceClient(authProvider);

            return graphClient;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseCustomExceptionHandler(loggerFactory);
            }

            app.UseMiddleware<RequestBodyLoggingMiddleware>();
            app.UseMiddleware<ResponseBodyLoggingMiddleware>();

            app.UseMiddleware<ScopedSerilogLoggingMiddleware>();
            app.UseSerilogRequestLogging();

            app.UseSwagger(Configuration);

            app.UseHttpsRedirection();

            app.UseRedirectToSwagger();

            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();

            // L'ordre est très important
            app.UseMiddleware<RolesMiddleware>();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private  StoreOptions BuildStoreOptions()
        {
            var connectionString = Configuration.GetConnectionString("SoEats");
            var options = new StoreOptions();
            options.Connection(connectionString);
            options.AutoCreateSchemaObjects = AutoCreate.CreateOrUpdate;
            options.DatabaseSchemaName = "so_eats";
            options.Schema.For<Restaurant>().Duplicate(r => r.SlugId, configure: idx => idx.IsUnique = true);
            options.Schema.For<Reservation>().ForeignKey<Restaurant>(r => r.RestaurantId);
            options.Schema.For<Promotion>().ForeignKey<Restaurant>(r => r.RestaurantId);
            options.Schema.For<Product>().ForeignKey<ProductType>(p => p.ProductTypeId);
            options.Schema.For<Order>().Duplicate(o => o.OrderId, configure: idx => idx.IsUnique = true);
            options.Schema.For<Order>().Identity(o => o.OrderNumber);
            options.Schema.For<Restaurant>().SoftDeleted();
            options.Schema.For<Reservation>().SoftDeleted();
            options.Schema.For<Order>().SoftDeleted();
            options.Schema.For<Promotion>().SoftDeleted();

            return options;
        }
    }

}