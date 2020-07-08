import React from 'react';
import {shallow} from 'enzyme';
import FourOhFour from 'pages/404';

describe('404 page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<FourOhFour />);
    expect(wrapper).toMatchSnapshot();
  });
});
