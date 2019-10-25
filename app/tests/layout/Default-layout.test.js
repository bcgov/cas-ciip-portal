import React from 'react';
import {render} from 'enzyme';
import DefaultLayout from '../../layouts/default-layout';

// It renders the Default Layout

it('It matches the last accepted Snapshot', () => {
  const wrapper = render(<DefaultLayout />);
  expect(wrapper).toMatchSnapshot();
});
