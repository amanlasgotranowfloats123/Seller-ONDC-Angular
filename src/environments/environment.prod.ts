// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_VERSION: '1.2.0',
  BASE_URL: 'https://jiw-ko-seller-as-staging.azurewebsites.net/api/v1/',
  // BASE_URL: 'http://localhost:3000/api/v1/',
  COSMOS_URL: 'https://jiw-ko-seller-cosmos-staging.documents.azure.com:443/',
  COSMOS_KEY:
    'R95sFprEInKo9lujD1t3yKUbrgwrF3pV1cOQRgXB6a5llksu3W8KDFdG5LiuZhhOfxeZS4ByoGvEACDb2ZfUmA==',
  COSMOS_DATABASE_ID: 'development',
  AGGREGATOR_BASE_URL: 'https://jiw-ko-seller-as-staging.azurewebsites.net/api/v1/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
