import React from 'react';
import {render} from 'enzyme';
import {UserFormComponent} from '../../../containers/User/UserForm';

describe('Form Edit User', () => {
  it('should render the snapshot', () => {
    const user = {
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test@test.com'
    };

    const wrapper = render(
      <UserFormComponent user={user} relay={null} sessionSub="42" />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
