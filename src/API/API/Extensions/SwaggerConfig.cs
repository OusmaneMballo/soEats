using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public class SwaggerConfig
    {
        public string Version { get; set; }
        public string Title { get; set; }
        public OAuth2Settings OAuth2 { get; set; }

        public class OAuth2Settings
        {
            public string ClientId { get; set; }
            public string AuthorizeUrl { get; set; }
            public List<string> Scopes { get; set; }
        }
    }
}
