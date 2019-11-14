import React from 'react';
import {shallow} from 'enzyme';
import {UserDetail} from '../../../containers/User/UserProfile';
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
    render = shallow(<UserDetail user={user} />);
    expect(render).toMatchSnapshot();
  });
  it('should render form when edit btn is clicked', () => {
    render = shallow(<UserDetail user={user} />);
    render.find('Button.button-edit').simulate('click');
    expect('Form.form-edit').toBeDefined();
    expect('Button.button-submit').toBeDefined();
  });
  it('should collapse form when submit btn is clicked', () => {
    render = shallow(<UserDetail user={user} />);
    render.find('Button.button-edit').simulate('click');
    render.find('Form.form-edit').simulate('submit');
    expect(render).not.toContain('Form.form-edit');
  });
});
