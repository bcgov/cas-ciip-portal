import React from 'react';
import {shallow} from 'enzyme';
import DefaultLayout from '../../layouts/default-layout';

// It renders the Default Layout

it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<DefaultLayout />);
  expect(wrapper).toMatchSnapshot();
});
