import React from 'react';
import {shallow} from 'enzyme';
import {FormUpdateUser} from '../../../containers/Forms/FormUpdateUser';

describe('Form Update User', () => {
  it('should render', () => {
    const user = {
      id: '1',
      firstName: 'Test',
      lastName: 'Test',
      emailAddress: 'Test@test.com'
    };

    const wrapper = shallow(<FormUpdateUser user={user} />);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('FormControl').length).toBe(4);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
