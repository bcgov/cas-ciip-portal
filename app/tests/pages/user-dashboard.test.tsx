import React from 'react';
import {shallow} from 'enzyme';
import UserDashboard from '../../pages/user-dashboard';

describe('landingIndustryUser', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<UserDashboard router={{query: {userId: 1}}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
