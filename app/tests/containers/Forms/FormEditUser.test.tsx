import React from 'react';
import {shallow} from 'enzyme';
import {FormEditUserComponent} from '../../../containers/Forms/FormEditUser';

describe('Form Edit User', () => {
  it('should render', () => {
    const user = {
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test@test.com'
    };

    const wrapper = shallow(<FormEditUserComponent user={user} />);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('FormControl').length).toBe(5);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
