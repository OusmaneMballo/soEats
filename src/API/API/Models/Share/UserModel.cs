using Microsoft.Graph;
using Newtonsoft.Json;

namespace API.Models
{
    public class UserModel : Microsoft.Graph.User
    {
        [JsonProperty(PropertyName = "password", NullValueHandling = NullValueHandling.Ignore)]
        public string Password { get; set; }

        public void SetB2CProfile(string tenantName, string issuerAssignedId)
        {
            PasswordProfile = new PasswordProfile
            {
                ForceChangePasswordNextSignIn = true,
                Password = Password,
                ODataType = null
            };
            PasswordPolicies = "DisablePasswordExpiration,DisableStrongPassword";
            Password = null;
            ODataType = null;
            Identities = new[]
            {
                new ObjectIdentity()
                {
                    SignInType = "emailAddress",
                    Issuer = tenantName,
                    IssuerAssignedId = issuerAssignedId
                }
            };
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
