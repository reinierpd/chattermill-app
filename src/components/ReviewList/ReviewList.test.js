/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// jest
import { mount, shallow } from 'enzyme';
import ReviewList from './ReviewList';

describe('AdDetail component', () => {
  it('validate List appear with data', () => {
    const data = [{ id: 1, comment: 'Hey dude', score: 5 }];
    const wrapper = shallow(
      <ReviewList reviews={data} handleFetchMore={() => {}} />,
    );
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').exists()).toBe(
      true,
    );
  });

  it("validate List doesn't appear and no data is notified", () => {
    const wrapper = shallow(
      <ReviewList reviews={[]} handleFetchMore={() => {}} />,
    );
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').exists()).toBe(
      false,
    );
    expect(wrapper.find('InfiniteScroll').html()).toContain(
      'Nothing to show...',
    );
  });
});
