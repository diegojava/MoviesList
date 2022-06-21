const api = () => {
  let apis = ['k_irla67zt', 'k_r45g9qpi']
  return Math.floor(Math.random() * apis.length)
}

export const environment = {
  production: true,
  apiUrl: 'https://imdb-api.com/en/API/MostPopularMovies/' + api
};
