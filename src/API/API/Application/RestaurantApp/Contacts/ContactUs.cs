using API.Application.Common;
using API.Domain;
using Marten;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Contacts
{
    public class ContactUsCommand : IRequest<Guid>
    {
  
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Message { get; set; }

    }

    public class ContactUsCommandHandler : IRequestHandler<ContactUsCommand, Guid>
    {
        private readonly IConfiguration _configuration;
        private readonly ISendEmail _sendGridEmailSender;

        public ContactUsCommandHandler(IConfiguration configuration, ISendEmail sendGridEmailSender)
        {
            _configuration = configuration;
            _sendGridEmailSender = sendGridEmailSender;
        }
        public async Task<Guid> Handle(ContactUsCommand request, CancellationToken cancellationToken)
        {
            var id = Guid.NewGuid();

            var contact = new ContactUs(id, request.Firstname, request.Lastname,request.Email, request.Title, request.Message);

            await SendEmailToSoeatsAsync(contact);
            
            return id;
        }

        private async Task SendEmailToSoeatsAsync(ContactUs customer)
        {
            var data = new
            {
                CustomerFirstname = customer.Firstname,
                CustomerLastname = customer.Lastname,
                CustomerEmail = customer.Email,
                CustomerTitle = customer.Title,
                CustomerMessage = customer.Message
            };
            await _sendGridEmailSender.SendAsync( _configuration["SoEats:ContactEmail"], _configuration["SendGrid:ContactTemplateId"], data, shouldAddSoEatsToBcc: false);
        }
    }

    internal class ContactUs
    {
        public Guid Id;
        public string Firstname { get; private set; }
        public string Lastname { get; private set; }
        public string Email { get; private set; }
        public string Title { get; private set; }
        public string Message { get; private set; }

        public ContactUs(Guid id, string firstname, string lastname, string email, string title, string message)
        {
            Id = id;
            Firstname = firstname;
            Lastname = lastname;
            Email = email;
            Title = title;
            Message = message;
        }
    }
}
