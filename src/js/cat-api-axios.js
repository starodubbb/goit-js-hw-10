import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_jB5FRB42XYxv200vwJxwFpQDQSepETE2WEB49jvZIUhLzjI68qun4HZGMOoLP1R3';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(res => res.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
}

export default { fetchBreeds, fetchCatByBreed };
