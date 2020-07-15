import React from 'react';
import {shallow} from 'enzyme';
import {DefaultLayoutComponent} from 'layouts/default-layout';

describe('The DefaultLayout component', () => {
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(<DefaultLayoutComponent session={null} />);
    expect(wrapper).toMatchSnapshot();
  });
});
