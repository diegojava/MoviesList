const api = () => {
  let apis = ['k_irla67zt', 'k_r45g9qpi']
  let index = Math.floor(Math.random() * apis.length)
  return apis[index]
}

export const environment = {
  production: true,
  apiUrl: 'https://imdb-api.com/en/API/MostPopularMovies/' + api
};
