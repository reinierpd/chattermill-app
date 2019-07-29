/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('render layout', () => {
    const wrapper = renderer.create(<Navbar />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
