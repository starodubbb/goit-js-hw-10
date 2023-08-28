import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import '../css/common.css';
import catAPI from './cat-api-axios';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  catInfo: document.querySelector('.cat-info'),
};
refs.breedSelect.addEventListener('change', onBreedSelectChange);

hideElement(refs.breedSelect);

catAPI
  .fetchBreeds()
  .then(breeds => {
    hideElement(refs.loader);

    const breedsMarkup = createBreedsMarkup(breeds);
    putMarkup(refs.breedSelect, breedsMarkup);
    showElement(refs.breedSelect);
    new SlimSelect({
      select: '.breed-select',
      settings: {
        placeholderText: 'Choose the breed',
      },
    });
  })
  .catch(processError);

function onBreedSelectChange(e) {
  clearInfoContainer();
  showElement(refs.loader);

  const breedId = e.currentTarget.value;
  catAPI
    .fetchCatByBreed(breedId)
    .then(breed => {
      hideElement(refs.loader);

      const markup = createInfoMarkup(breed[0]);
      putMarkup(refs.catInfo, markup);
    })
    .catch(processError);
}

function createBreedsMarkup(breeds) {
  const placeholderMarkup = `<option data-placeholder="true"></option>`;
  const breadsMarkup = breeds
    .map(breed => {
      return `<option class="bread-option" value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  return placeholderMarkup + breadsMarkup;
}

function createInfoMarkup(cat) {
  return `
    <img class="cat-image" src="${cat.url}" alt="${cat.breeds[0].name} cat">
    <div class="cat-details">
      <h2 class="cat-title">${cat.breeds[0].name}</h2>
      <p class="cat-description">${cat.breeds[0].description}</p>
      <p class="cat-temperament">${cat.breeds[0].temperament}</p>
    </div>
  `;
}

function putMarkup(container, markup) {
  container.innerHTML = markup;
}

function clearInfoContainer() {
  refs.catInfo.innerHTML = '';
}

function hideElement(element) {
  element.classList.add('is-hidden');
}

function showElement(element) {
  element.classList.remove('is-hidden');
}

function showNotification(type, text) {
  const types = ['success', 'failure', 'warning', 'info'];
  if (!types.includes(type)) {
    return;
  }
  Notify[type](text, { clickToClose: true });
}

function processError(error) {
  hideElement(refs.loader);
  showNotification(
    'failure',
    'Oops! Something went wrong! Try reloading the page!'
  );
  console.log(error);
}
