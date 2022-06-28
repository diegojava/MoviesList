// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// k_r45g9qpi -- k_irla67zt

function apiKey() {
  let apis = ['k_irla67zt', 'k_r45g9qpi']
  let index = Math.floor(Math.random() * apis.length)
  return apis[index]
}

export const environment = {
  production: false,
  //apiUrl: 'https://imdb-api.com/en/API/MostPopularMovies/' + apiKey(),
  apiUrl: 'http://api.tvmaze.com/shows'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
