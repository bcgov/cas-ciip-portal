import React from 'react';
import {shallow} from 'enzyme';
import {UserProfileDropdownComponent} from 'containers/User/UserProfileDropdown';

// https://github.com/facebook/relay/issues/2394#issuecomment-379590645
const mockRefType: any = null;
const user = {
  firstName: 'Hamza',
  lastName: 'Javed',
  emailAddress: 'hamza@button.is',
  ' $refType': mockRefType
};
let render;
describe('UserProfileDropdown', () => {
  it('matches snapshot', () => {
    render = shallow(<UserProfileDropdownComponent user={user} />);
    expect(render).toMatchSnapshot();
  });
});
