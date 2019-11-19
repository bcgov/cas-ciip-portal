import React from 'react';
import {shallow} from 'enzyme';
import {UserProfileComponent} from 'containers/User/UserProfile';
const user = {
  id: 'WyJ1c2VycyIsMV0=',
  rowId: 1,
  firstName: 'Hamza',
  lastName: 'Javed',
  emailAddress: 'hamza@button.is',
  phoneNumber: '12345',
  occupation: 'developer'
};
let render;
describe('UserDetail', () => {
  it('matches snapshot', () => {
    render = shallow(<UserProfileComponent user={user} />);
    expect(render).toMatchSnapshot();
  });
  it('should render form when edit btn is clicked', () => {
    render = shallow(<UserProfileComponent user={user} />);
    render.find('Button.button-edit').simulate('click');
    expect('UserForm').toBeDefined();
    expect('Button.button-submit').toBeDefined();
  });
});
