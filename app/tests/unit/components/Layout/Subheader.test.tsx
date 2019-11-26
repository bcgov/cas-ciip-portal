import React from 'react';
import {render} from 'enzyme';
import Subheader from 'components/Layout/Subheader';

// It renders the SubHeader

it('It matches the last accepted Snapshot', () => {
  const wrapper = render(<Subheader />);
  expect(wrapper).toMatchSnapshot();
});
