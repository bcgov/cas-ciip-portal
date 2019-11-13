import React from 'react';
import {shallow} from 'enzyme';
import {createMockEnvironment} from 'relay-test-utils';
import {FormEditUserComponent} from '../../../containers/Forms/FormEditUser';

const environment = createMockEnvironment();

describe('Form Edit User', () => {
  it('should render', () => {
    const user = {
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test@test.com'
    };
    const relay = {
      environment
    };

    const wrapper = shallow(
      <FormEditUserComponent relay={relay} user={user} />
    );

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('FormControl').length).toBe(5);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
