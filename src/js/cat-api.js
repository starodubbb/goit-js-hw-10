const BASE_URL = 'https://api.thecatapi.com/v1';
const options = {
  headers: {
    'x-api-key':
      'live_jB5FRB42XYxv200vwJxwFpQDQSepETE2WEB49jvZIUhLzjI68qun4HZGMOoLP1R3',
  },
};

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options).then(
    res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    }
  );
}

export default { fetchBreeds, fetchCatByBreed };
