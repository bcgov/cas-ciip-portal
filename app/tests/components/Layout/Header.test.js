import React from 'react';
import {render} from 'enzyme';
import Header from '../../../components/Layout/Header';

// It renders the Header

it('It matches the last accepted Snapshot', () => {
  const wrapper = render(<Header />);
  expect(wrapper).toMatchSnapshot();
});
