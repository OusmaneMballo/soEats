using API.Application.Common;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure
{
    public class SendGridEmailSender : ISendEmail
    {
        private readonly ISendGridClient _sendGridClient;
        private readonly IConfiguration _configuration;
        public SendGridEmailSender(ISendGridClient sendGridClient, IConfiguration configuration)
        {
            _sendGridClient = sendGridClient;
            _configuration = configuration;
        }
        public async Task SendAsync(string toEmail, string templateId, object data, bool shouldAddSoEatsToBcc = true)
        {
            var sendGridMessage = new SendGridMessage();
            sendGridMessage.SetFrom(_configuration["SoEats:ContactEmail"], "So Eats");
            sendGridMessage.AddTo(toEmail);
            sendGridMessage.SetTemplateId(templateId);
            sendGridMessage.SetTemplateData(data);
            if (shouldAddSoEatsToBcc)
            {
                sendGridMessage.AddBcc(_configuration["SoEats:ContactEmail"]);
            }

            var response = await _sendGridClient.SendEmailAsync(sendGridMessage);
        }
    }
}
