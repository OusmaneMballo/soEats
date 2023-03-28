using API.Application.Common;
using API.Domain.SuperMarkets;
using API.Models;
using API.Services;
using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/supermarketmanager")]
    [Authorize(Roles = "Admin")]
    public class SuperMarketManagerController : ApiControllerBase
    {
        private readonly B2CUserService _b2CUserService;
        private readonly IConfiguration _configuration;
        private readonly IDocumentSession _documentSession;
        private readonly ISendEmail _sendGridEmailSender;

        public SuperMarketManagerController(B2CUserService b2CUserService, IConfiguration configuration, IDocumentSession documentSession, ISendEmail sendGridEmailSender)
        {
            _b2CUserService = b2CUserService;
            _configuration = configuration;
            _documentSession = documentSession;
            _sendGridEmailSender = sendGridEmailSender;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CreateAccountCommand command)
        {
            var password = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Replace("/", "").Replace("+", "").ToLowerInvariant().Substring(0, 12);
            var azureB2CUser = await _b2CUserService.CreateAsync(command, password);
            var user = new SuperMarketManager(Guid.Parse(azureB2CUser.Id), azureB2CUser.Mail);

            _documentSession.Store(user);
            await _documentSession.SaveChangesAsync();
            await SendEmailToUserAsync(azureB2CUser);

            return Ok();
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSuperMarketManager(Guid id)
        {
            var user = await _documentSession.Query<SuperMarketManager>().FirstOrDefaultAsync(s => s.Id == id);

            return Ok(new { SuperMarketManagerId = user.Id, email = user.Email });
        }

        private async Task SendEmailToUserAsync(Microsoft.Graph.User user)
        {
            var data = new
            {
                FullName = user.DisplayName,
                ResetPasswordUrl = _configuration["SoEats:ResetPasswordUrl"]
            };
            await _sendGridEmailSender.SendAsync(user.Mail, _configuration["SendGrid:TemplateId"], data);
        }


    }
}
