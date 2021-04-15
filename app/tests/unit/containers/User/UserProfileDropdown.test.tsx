import React from 'react';
import {shallow} from 'enzyme';
import {UserProfileDropdownComponent} from 'containers/User/UserProfileDropdown';
import {UserProfileDropdown_user} from '__generated__/UserProfileDropdown_user.graphql';

const user = {
  firstName: 'Test',
  lastName: 'Tester',
  emailAddress: 'really-long-email-to-see-wrapping@button.is',
  ' $refType': 'UserProfileDropdown_user'
};
let render;
describe('UserProfileDropdown', () => {
  it('matches mobile snapshot', () => {
    render = shallow(
      <UserProfileDropdownComponent user={user as UserProfileDropdown_user} />
    );
    expect(render).toMatchSnapshot();
  });

  it('matches desktop snapshot', () => {
    render = shallow(
      <UserProfileDropdownComponent user={user as UserProfileDropdown_user} />
    );
    expect(render).toMatchSnapshot();
  });
});
