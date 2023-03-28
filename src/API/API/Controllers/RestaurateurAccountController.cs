using System;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Common;
using API.Domain;
using API.Infrastructure;
using API.Models;
using API.Services;
using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Controllers
{
    [Route("api/restaurateuraccount")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class RestaurateurAccountController : ControllerBase
    {
        private readonly B2CUserService _b2CUserService;
        private readonly IConfiguration _configuration;
        private readonly IDocumentSession _documentSession;
        private readonly ISendEmail _sendGridEmailSender;

        public RestaurateurAccountController(B2CUserService b2CUserService, IConfiguration configuration, IDocumentSession documentSession, ISendEmail sendGridEmailSender)
        {
            _b2CUserService = b2CUserService;
            _configuration = configuration;
            _documentSession = documentSession;
            _sendGridEmailSender = sendGridEmailSender;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CreateAccountCommand command)
        {
            var password = Convert.ToBase64String(Guid.NewGuid().ToByteArray())
                                                      .Replace("/", "")
                                                      .Replace("+", "")
                                                      .ToLowerInvariant()
                                                      .Substring(0, 12);

            var azureB2CUser = await _b2CUserService.CreateAsync(command, password);

            var user = new Restaurateur(Guid.Parse(azureB2CUser.Id), azureB2CUser.Mail);

            _documentSession.Store(user);
            await _documentSession.SaveChangesAsync();

            await SendEmailToUserAsync(azureB2CUser);

            return CreatedAtAction(nameof(GetRestaurateur), new { id = user.Id }, null);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurateur(Guid id)
        {
            var user = await _documentSession.Query<Restaurateur>().FirstOrDefaultAsync(u => u.Id == id);

            return Ok(new { restaurateurId = user.Id, email = user.Email });
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
