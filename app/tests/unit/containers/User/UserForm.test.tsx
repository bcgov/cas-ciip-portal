import React from 'react';
import {render, mount} from 'enzyme';
import {UserFormComponent} from 'containers/User/UserForm';

describe('Form Edit User', () => {
  it('should render the snapshot', () => {
    const user = {
      ' $refType': null,
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test@test.com',
      phoneNumber: '1234567890',
      occupation: 'test'
    };

    const wrapper = render(
      <UserFormComponent user={user} relay={null} onSubmit={null} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should validate the email', () => {
    const user = {
      ' $refType': null,
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test',
      phoneNumber: '1234567890',
      occupation: 'test'
    };

    const wrapper = mount(
      <UserFormComponent user={user} relay={null} onSubmit={null} />
    );

    expect(wrapper.find('.text-danger').text()).toContain(
      'Please enter a valid email address'
    );
  });

  it('should validate the phone number', () => {
    const user = {
      ' $refType': null,
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test@test.com',
      phoneNumber: '0',
      occupation: 'test'
    };

    const wrapper = mount(
      <UserFormComponent user={user} relay={null} onSubmit={null} />
    );

    expect(wrapper.find('.text-danger').text()).toContain(
      'Please enter a valid phone number'
    );
  });
});
