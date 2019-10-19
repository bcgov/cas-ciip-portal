import React from 'react';
import {shallow} from 'enzyme';
import UserDashboard from '../../containers/pageContainers/UserDashboard';

describe('landingIndustryUser', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<UserDashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
