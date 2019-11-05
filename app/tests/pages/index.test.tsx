import React from 'react';
import {shallow} from 'enzyme';
import Index from '../../containers/pageContainers/Index';

describe('landing', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper).toMatchSnapshot();
  });
});
