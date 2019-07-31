/* eslint-disable max-len,no-unused-vars */
import fetch from 'isomorphic-unfetch';

const API_URL = 'https://chattermill-challenge.com/api';
const categories = {
  data: [
    {
      id: 1218,
      name: 'Information',
    },
    {
      id: 1219,
      name: 'Miscellaneous',
    },
    {
      id: 1220,
      name: 'Product & Features',
    },
    {
      id: 1221,
      name: 'Security',
    },
    {
      id: 1222,
      name: 'Customer Service',
    },
    {
      id: 1223,
      name: 'App',
    },
    {
      id: 1224,
      name: 'Brand',
    },
  ],
};
const themes = {
  data: [
    {
      id: 6374,
      name: 'Auto Log-Out',
      category_id: 1221,
    },
    {
      id: 6344,
      name: 'General',
      category_id: 1221,
    },
    {
      id: 6345,
      name: 'Identification / Verification',
      category_id: 1221,
    },
    {
      id: 6361,
      name: 'Information',
      category_id: 1221,
    },
    {
      id: 6331,
      name: 'Other',
      category_id: 1221,
    },
    {
      id: 6337,
      name: 'Lunch',
      category_id: 1221,
    },
  ],
};
const reviews = {
  data: [
    {
      id: 59434207,
      created_at: '2019-07-18T10:24:45Z',
      score: 5,
      comment:
        'Great app and easy to use. Everything works smoothly, sending and receiving money is fast and simple and it is easy to find someone, either with your phone contacts or the "find people near me" function. The verification process is very efficient and quick, the card arrived without any issues and it was very easy to set everything up',
      properties: [
        {
          key: 'language',
          name: 'Language',
          value: 'English',
        },
        {
          key: 'company',
          name: 'Company',
          value: 'Revolut',
        },
        {
          key: 'app_version',
          name: 'Version',
          value: '5.55',
        },
        {
          key: 'product_name',
          name: 'Product Name',
          value: 'Revolut - A Radically Better Account',
        },
      ],
      themes: [
        {
          theme_id: 6374,
          sentiment: 1,
        },
        {
          theme_id: 6344,
          sentiment: 1,
        },
        {
          theme_id: 6345,
          sentiment: 1,
        },
        {
          theme_id: 6361,
          sentiment: 1,
        },
      ],
    },
    {
      id: 59002082,
      created_at: '2019-07-18T05:45:21Z',
      score: 4,
      comment:
        'good but a real pain that it logs you out if you switch screens',
      properties: [
        {
          key: 'language',
          name: 'Language',
          value: 'English',
        },
        {
          key: 'company',
          name: 'Company',
          value: 'Barclays',
        },
        {
          key: 'app_version',
          name: 'Version',
          value: '1.96',
        },
        {
          key: 'product_name',
          name: 'Product Name',
          value: 'Barclays',
        },
      ],
      themes: [
        {
          theme_id: 6337,
          sentiment: -1,
        },
        {
          theme_id: 6374,
          sentiment: 1,
        },
      ],
    },
    {
      id: 59002088,
      created_at: '2019-07-18T04:18:48Z',
      score: 5,
      comment: 'Annoying that it always logs you out, but otherwise very good',
      properties: [
        {
          key: 'language',
          name: 'Language',
          value: 'English',
        },
        {
          key: 'company',
          name: 'Company',
          value: 'Barclays',
        },
        {
          key: 'app_version',
          name: 'Version',
          value: '1.94',
        },
        {
          key: 'product_name',
          name: 'Product Name',
          value: 'Barclays',
        },
      ],
      themes: [
        {
          theme_id: 6337,
          sentiment: -1,
        },
        {
          theme_id: 6374,
          sentiment: 1,
        },
      ],
    },
    {
      id: 59434287,
      created_at: '2019-07-17T22:25:56Z',
      score: 5,
      comment:
        'Like design/colour of card, no problem with app except dupl process because of some problems. My partner also had a problem with verification. Application just hanging (iPhone version of one week old)',
      properties: [
        {
          key: 'language',
          name: 'Language',
          value: 'English',
        },
        {
          key: 'company',
          name: 'Company',
          value: 'Revolut',
        },
        {
          key: 'app_version',
          name: 'Version',
          value: '6.0.1',
        },
        {
          key: 'product_name',
          name: 'Product Name',
          value: 'Revolut - A Radically Better Account',
        },
      ],
      themes: [
        {
          theme_id: 6374,
          sentiment: -1,
        },
        {
          theme_id: 6361,
          sentiment: -1,
        },
      ],
    },
    {
      id: 59010762,
      created_at: '2019-07-17T19:32:06Z',
      score: 1,
      comment:
        'I can not go back when he asks me to verify identity. I was wrong to choose the country of residence and neither uninstalling and returning to install it. Always skip the identity verification screen and you can not go back to select another country.',
      properties: [
        {
          key: 'language',
          name: 'Language',
          value: 'Spanish',
        },
        {
          key: 'company',
          name: 'Company',
          value: 'Revolut',
        },
        {
          key: 'app_version',
          name: 'Version',
          value: '',
        },
        {
          key: 'product_name',
          name: 'Product Name',
          value: 'Revolut - A Radically Better Account',
        },
      ],
      themes: [
        {
          theme_id: 6374,
          sentiment: 1,
        },
        {
          theme_id: 6361,
          sentiment: -1,
        },
      ],
    },
    {
      id: 59111209,
      created_at: '2019-07-17T13:56:23Z',
      score: 1,
      comment:
        "I don't have a passport or driving licence so they refused to open an account. I have accounts with three banks, a mortgage, I am a registered trustee of three charities and am a registered Money Laundering Reporting Officer with the Financial Conduct Authority. I have plenty of ID but just not those forms of ID. Never mind, I can go somewhere else.",
      properties: [
        {
          key: 'language',
          name: 'Language',
          value: 'English',
        },
        {
          key: 'company',
          name: 'Company',
          value: 'Monzo',
        },
        {
          key: 'app_version',
          name: 'Version',
          value: '',
        },
        {
          key: 'product_name',
          name: 'Product Name',
          value: 'Monzo Bank',
        },
      ],
      themes: [
        {
          theme_id: 6374,
          sentiment: 1,
        },
        {
          theme_id: 6361,
          sentiment: -1,
        },
      ],
    },
  ],
};

function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter(item => params[item] !== null)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}
async function fetchData(entity, params) {
  const parsedParams = getQueryString(params);
  let res;
  try {
    res = await fetch(`${API_URL}/${entity}?${parsedParams}`);
  } catch (e) {
    console.log(e);
  }
  const data = await res.json();
  return data.data;
}

export default class Api {
  static async getReviews(params = {}) {
    return fetchData('reviews', params);
    // return Promise.resolve(reviews.data);
  }

  static async getCategories(params = {}) {
    return fetchData('categories', params);
    // return Promise.resolve(categories.data);
  }

  static async getThemes(params = {}) {
    return fetchData('themes', params);
    // return Promise.resolve(themes.data);
  }
}
