import fetch from 'isomorphic-unfetch';

const API_URL = 'https://chattermill-challenge.com/api';

function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter(item => params[item] !== null)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}
async function fetchData(entity, params) {
  const parsedParams = getQueryString(params);
  const res = await fetch(`${API_URL}/${entity}?${parsedParams}`);
  const data = await res.json();
  return data.data;
}

export default class Api {
  static async getReviews(params = {}) {
    return fetchData('reviews', params);
  }

  static async getCategories(params = {}) {
    return fetchData('categories', params);
  }

  static async getThemes(params = {}) {
    return fetchData('themes', params);
  }
}
