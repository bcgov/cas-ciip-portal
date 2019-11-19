import React from 'react';
import {render} from 'enzyme';
import HeaderLayout from 'components/Layout/Header';

// It renders the Header

it('It matches the last accepted Snapshot', () => {
  const wrapper = render(<HeaderLayout />);
  expect(wrapper).toMatchSnapshot();
});
