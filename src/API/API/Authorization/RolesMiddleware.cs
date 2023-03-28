using API.Domain;
using API.Domain.SuperMarkets;
using Marten;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Authorization
{
    public class RolesMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RolesMiddleware> _logger;
        //private readonly IQuerySession _querySession;

        public RolesMiddleware(
            RequestDelegate next,
            ILogger<RolesMiddleware> logger
            )
        {
            _next = next;
            _logger = logger;
            
        }

        public async Task InvokeAsync(HttpContext context, IQuerySession querySession)
        {
            
            // Si pas d'authentification, on continue.
            // Il sera rejeté s'il accède à une route avec authentification
            if (context.User.Identity == null || !context.User.Identity.IsAuthenticated)
            {
                await _next(context);
                return;
            }

            var cancellationToken = context.RequestAborted;

            // On récupère le guid du user connecté
            // Si c'est null, on rejette
            var userSub = context.User.FindFirst(StandardJwtClaimTypes.Subject)?.Value;
            if (string.IsNullOrEmpty(userSub))
            {
                await context.WriteAccessDeniedResponse("User 'sub' claim is required", cancellationToken: cancellationToken);
                return;
            }

            // TODO: 
            // Si le user est admin, on ajoute le role admin
            // Si le user est un restaurateur, on ajoute le role restaurauteur
            // Si le user est un SuperMarketManager, on ajoute le role superMarketManager
            // Sinon, on ajoute juste le rôle client
            // Donc faudra requeter la base Postgres
            // 2 tables: Admin et Restaurateur
            var role = "Client";
            var userId = Guid.Parse(userSub);

            if (querySession.Query<Restaurateur>().SingleOrDefault(u => u.Id == userId) != null)
            {
                role = "Restaurateur";

            }
            else
            {
                if (querySession.Query<Admin>().SingleOrDefault(u => u.Id == userId) != null)
                {
                    role = "Admin";
                }
                else
                {
                    if (querySession.Query<SuperMarketManager>().SingleOrDefault(u => u.Id == userId) != null)
                    {
                        role = "SuperMarketManager";
                    }
                }
            } 

            var permissionsIdentity = new ClaimsIdentity(nameof(RolesMiddleware), "name", "role");
            permissionsIdentity.AddClaim(new Claim("role", role));

            context.User.AddIdentity(permissionsIdentity);
            await _next(context);
         }
    }
}
