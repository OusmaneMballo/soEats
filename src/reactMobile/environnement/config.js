
import Constants from "expo-constants"

export const appConfig = {
    DEBUG: false,
    API_URL: '',
  };
  
  // check
  const { releaseChannel } = Constants.manifest;
  
  // DEV:
  if (releaseChannel === undefined) { 
    appConfig.API_URL = "https://africaeats-api-dev.azurewebsites.net";
  } else
  
  // STAGING
  if (releaseChannel.indexOf('staging') !== -1) { 
    appConfig.API_URL = "https://africaeats-api-dev.azurewebsites.net";
  } else
  
  // PROD
  if (releaseChannel.indexOf('production') !== -1) { 
    appConfig.API_URL = "https://gateway.so-eats.com/";
  }
