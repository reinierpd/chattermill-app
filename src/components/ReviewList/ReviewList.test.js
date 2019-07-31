/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// jest
import { shallow } from 'enzyme';
import ReviewList from './ReviewList';

describe('AdDetail component', () => {
  it('validate List appear with data', () => {
    const data = [{ id: 1, comment: 'Hey dude', score: 5, themes: [] }];
    const wrapper = shallow(
      <ReviewList reviews={data} themes={[]} handleFetchMore={() => {}} />,
    );
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').exists()).toBe(
      true,
    );
  });

  it("validate List doesn't appear and no data is notified", () => {
    const wrapper = shallow(
      <ReviewList reviews={[]} themes={[]} handleFetchMore={() => {}} />,
    );
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').exists()).toBe(
      false,
    );
    expect(wrapper.find('InfiniteScroll').html()).toContain(
      'Nothing to show...',
    );
  });
});
