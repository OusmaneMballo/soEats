using API.Application.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace API.Infrastructure
{
    public class OrangeSMSSender : ISendSMS
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<OrangeSMSSender> _logger;

        public OrangeSMSSender(IConfiguration configuration, ILogger<OrangeSMSSender> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendAsync(string subject, string content, params string[] recipients)
        {
            var isSMSSendingEnabled = _configuration.GetValue<bool>("SMSSettings:EnableSMSSending");
            if (!isSMSSendingEnabled)
            {
                return;
            };

            var baseUrl = _configuration["SMSSettings:Url"];
            var username = _configuration["SMSSettings:Username"];
            var secretKey = _configuration["SMSSettings:SecretKey"];
            var token = _configuration["SMSSettings:Token"]; ;
            var timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

            SMS sms = BuildSMS(subject, content, recipients.ToList());
            var jsonSMS = JsonConvert.SerializeObject(sms);

            var txtToEncrypt = token + jsonSMS + timestamp;
            var publicKey = GenerePublicKey(txtToEncrypt, secretKey);

            var stringContent = new StringContent(jsonSMS);
            stringContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var httpClient = new HttpClient();
            byte[] byteArray = Encoding.ASCII.GetBytes($"{username}:{token}");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            var url = BuildUrl(baseUrl, token, publicKey, timestamp);

            var response = await httpClient.PostAsync(url, stringContent);
            string result = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("SMS Sent {@SentSMS}", sms);
            _logger.LogInformation("Response received {ResponseSMS}", result);
        }

        private SMS BuildSMS(string subject, string content, List<string> recipients)
        {
            return new SMS()
            {
                Messages = new List<Message>()
                {
                    new Message
                    {
                        Subject = subject,
                        Content = content,
                        Signature = "So Eats",
                        Recipients = recipients.Select((r, idx) => new Recipient{ Id = $"{idx+1}", Value = r}).ToList()
                    }
                }
            };
        }

        public static string GenerePublicKey(string message, string secret)
        {
            var encoding = new UTF8Encoding();
            var keyBytes = encoding.GetBytes(secret);
            var messageBytes = encoding.GetBytes(message);
            using (var hmacsha1 = new HMACSHA1(keyBytes))
            {
                var hashMessage = hmacsha1.ComputeHash(messageBytes);
                return BitConverter.ToString(hashMessage).Replace("-", string.Empty).ToLowerInvariant();
            }
        }

        private static string BuildUrl(string baseUrl, string token, string publicKey, string timestamp)
        {
            var builder = new UriBuilder(baseUrl);
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["token"] = token;
            query["key"] = publicKey;
            query["timestamp"] = timestamp;
            builder.Query = query.ToString();
            return builder.ToString();
        }
    }

    public class Recipient
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("value")]
        public string Value { get; set; }
    }

    public class Message
    {
        [JsonProperty("signature")]
        public string Signature { get; set; }

        [JsonProperty("subject")]
        public string Subject { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("recipients")]
        public List<Recipient> Recipients { get; set; }
    }

    public class SMS
    {
        [JsonProperty("messages")]
        public List<Message> Messages { get; set; }
    }
}
