// This file can be replaced during build by using the `fileReplacements` array
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environment = {
    production: false,
    SERVICE_URL: 'https://africaeats-api-dev.azurewebsites.net/',
    REDIRECT_URI:'https://africaeats-dev.azurewebsites.net/',
    clientId: '4f2a9ab0-843e-4e77-8e6b-7418bc322409',
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
               authority: 'https://wineosgroupb2cdev.b2clogin.com/wineosgroupb2cdev.onmicrosoft.com/B2C_1_SignIn'
           },
           resetPassword: {
               authority: 'https://wineosgroupb2cdev.b2clogin.com/wineosgroupb2cdev.onmicrosoft.com/B2C_1_PasswordReset'
           },
           editProfile: {
               authority: 'https://wineosgroupb2cdev.b2clogin.com/wineosgroupb2cdev.onmicrosoft.com/b2c_1_edit_profile'
           }
       },
       authorityDomain: "wineosgroupb2cdev.b2clogin.com"
   };
   
   // #region 2) Web API Configuration
   /**
    * Enter here the coordinates of your Web API and scopes for access token request
    * The current application coordinates were pre-registered in a B2C tenant.
    */
    export const apiConfig: {b2cScopes: string[]; webApi: string} = {
       b2cScopes: ['https://wineosgroupb2cdev.onmicrosoft.com/africaeats-api-dev/access_as_user',
                   'https://wineosgroupb2cdev.onmicrosoft.com/africaeats-api-dev/openid'
                   ],
       webApi: 'https://africaeats-api-dev.azurewebsites.net/api'
   };
   
   // #endregion
   
   /**
    * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
    * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
    */
    export const protectedResources = {
       Api: {
         endpoint: "https://africaeats-api-dev.azurewebsites.net/api",
         scopes: ['https://wineosgroupb2cdev.onmicrosoft.com/africaeats-api-dev'],
       },
     }
   
   // Scopes you enter will be used for the access token request for your web API
   export const tokenRequest: {scopes: string[]} = {
       scopes: apiConfig.b2cScopes 
   };
   