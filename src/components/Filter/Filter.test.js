/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// jest
import { mount } from 'enzyme';
import rendered from 'react-test-renderer';
import 'jest-styled-components';
import Filter from './Filter';

describe('AdDetail component', () => {
  it('validate correct mounting with data array of objects', () => {
    const data = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }];
    const wrapper = rendered.create(
      <Filter
        data={data}
        name="item"
        label="Render item"
        value=""
        handleChange={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('validate correct mounting with data array of values', () => {
    const data = ['Item1', 'Item2'];
    const wrapper = rendered.create(
      <Filter
        data={data}
        name="item"
        label="Render item"
        value=""
        handleChange={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('validate callback called when select item', () => {
    const data = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }];
    const mockCallback = jest.fn();
    const wrapper = mount(
      <Filter
        data={data}
        name="item"
        label="Render item"
        value=""
        handleChange={mockCallback}
      />,
    );
    wrapper
      .find('#item-select')
      .get(0)
      .props.onChange({ target: { name: 'item', value: '1' } });

    expect(mockCallback).toBeCalledWith({
      name: 'item',
      value: '1',
    });
  });
});
