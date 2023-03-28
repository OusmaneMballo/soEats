using System.Threading.Tasks;
using API.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;

namespace API.Services
{
    public class B2CUserService
    {
        private readonly GraphServiceClient _graphServiceClient;
        private readonly IConfiguration _configuration;

        public B2CUserService(GraphServiceClient graphServiceClient, IConfiguration configuration)
        {
            _graphServiceClient = graphServiceClient;
            _configuration = configuration;
        }

        public async Task<Microsoft.Graph.User> CreateAsync(CreateAccountCommand command, string password)
        {
            var user = new UserModel()
            {
                BusinessPhones = new[] { command.PhoneNumber },
                GivenName = command.FirstName,
                Surname = command.LastName,
                Mail = command.Email,
                DisplayName = $"{command.FirstName} {command.LastName}",
                Password = password
            };

            var tenantName = _configuration.GetSection("AzureAdB2C").GetValue<string>("Domain");
            user.SetB2CProfile(tenantName, command.Email);

            return await _graphServiceClient.Users
                                   .Request()
                                   .AddAsync(user);
        }
    }
}
