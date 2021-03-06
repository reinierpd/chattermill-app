/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// jest
import { mount } from 'enzyme';
import wait from 'waait';
import Api from 'api';
import { Router } from 'routes';
import WithFilterData from './WithFilterData';

describe('WithFilterData component', () => {
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
        comment: 'Great app and easy to use. Everything works smoothly, ',
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
        comment: 'Annoying that it always logs you out, but otherwise  good',
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
    ],
  };

  const mockCategoriesCall = jest
    .spyOn(Api, 'getCategories')
    .mockImplementation(() => Promise.resolve(categories.data));
  const mockThemesCall = jest
    .spyOn(Api, 'getThemes')
    .mockImplementation(() => Promise.resolve(themes.data));
  const mockReviewsCall = jest
    .spyOn(Api, 'getReviews')
    .mockImplementation(() => Promise.resolve(reviews.data));

  const routerMock = jest
    .spyOn(Router, 'pushRoute')
    .mockImplementation(() => {});

  it('validate correct mounting', async () => {
    const wrapper = mount(
      <WithFilterData initialFilters={{}} route="example">
        {() => <h1>Testing</h1>}
      </WithFilterData>,
    );

    await wait();
    wrapper.update();

    // check category filter exist
    expect(wrapper.find('#category_id-select').exists()).toBe(true);

    // check theme filter exist
    expect(wrapper.find('#theme_id-select').exists()).toBe(true);

    // check properties filters exist
    expect(wrapper.find('#language-select').exists()).toBe(true);
    expect(wrapper.find('#company-select').exists()).toBe(true);
    expect(wrapper.find('#app_version-select').exists()).toBe(true);
    expect(wrapper.find('#product_name-select').exists()).toBe(true);
  });

  it('validate change category select trigger a themes Api call', async () => {
    const wrapper = mount(
      <WithFilterData initialFilters={{}} route="example">
        {() => <h1>Testing</h1>}
      </WithFilterData>,
    );

    await wait();
    wrapper.update();
    wrapper
      .find('#category_id-select')
      .get(0)
      .props.onChange({ target: { name: 'category_id', value: '1218' } });

    await wait();
    wrapper.update();

    // check themes call with category filter
    expect(mockThemesCall).lastCalledWith(
      expect.objectContaining({ category_id: '1218' }),
    );

    // check reviews call with category filter
    expect(mockReviewsCall).lastCalledWith(
      expect.objectContaining({ category_id: '1218' }),
    );

    expect(routerMock).toBeCalledWith(
      'example',
      expect.objectContaining({
        category_id: '1218',
        offset: 0,
        theme_id: null,
      }),
    );
  });
});
