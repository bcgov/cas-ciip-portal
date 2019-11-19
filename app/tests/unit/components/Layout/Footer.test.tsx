import React from 'react';
import {render} from 'enzyme';
import Footer from 'components/Layout/Footer';

// It renders the Footer

it('It matches the last accepted Snapshot', () => {
  const wrapper = render(<Footer />);
  expect(wrapper).toMatchSnapshot();
});
