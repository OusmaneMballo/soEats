import { BrowserCacheLocation, IPublicClientApplication, LogLevel, PublicClientApplication } from "@azure/msal-browser";

export const environment = {
  production: true,
  SERVICE_URL: 'https://gateway.so-eats.com/',
  REDIRECT_URI:'https://so-eats.com/',
  clientId: '1be165bc-05e3-487a-98ba-f8d451f14e12',

};

/**
 * ================================================================================================================
 * -----------------------------------------Configuration Azure B2C------------------------------------------------
 * ================================================================================================================
 * **/

 export const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 /**
  * Enter here the user flows and custom policies for your B2C application,
  * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
  * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
  */
  export const b2cPolicies = {
     names: {
         signIn: 'B2C_1_SignIn',
         resetPassword: 'B2C_1_PasswordReset',
         editProfile: 'b2c_1_edit_profile'
     },
     authorities: {
         signIn: {
             authority: 'https://soeats.b2clogin.com/soeats.onmicrosoft.com/B2C_1_SignIn'
         },
         resetPassword: {
             authority: 'https://soeats.b2clogin.com/soeats.onmicrosoft.com/B2C_1_PasswordReset'
         },
         editProfile: {
             authority: 'https://soeats.b2clogin.com/soeats.onmicrosoft.com/b2c_1_edit_profile'
         }
     },
     authorityDomain: "soeats.b2clogin.com"
 };
 
 // #region 2) Web API Configuration
 /**
  * Enter here the coordinates of your Web API and scopes for access token request
  * The current application coordinates were pre-registered in a B2C tenant.
  */
  export const apiConfig: {b2cScopes: string[]; webApi: string} = {
     b2cScopes: ['https://soeats.onmicrosoft.com/web-api/access_as_user',
                 'https://soeats.onmicrosoft.com/web-api/openid'
                 ],
     webApi: 'https://gateway.so-eats.com'
 };
 
 // #endregion
 
 /**
  * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
  */
  export const protectedResources = {
     Api: {
       endpoint: "https://gateway.so-eats.com",
       scopes: ['https://soeats.onmicrosoft.com/web-api'],
     },
   }
 
 // Scopes you enter will be used for the access token request for your web API
 export const tokenRequest: {scopes: string[]} = {
     scopes: apiConfig.b2cScopes 
 };
 

