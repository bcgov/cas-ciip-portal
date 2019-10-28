import React from 'react';
import {shallow} from 'enzyme';
import {FormCreateUser} from '../../../containers/Forms/FormCreateUser';

describe('Form Create User', () => {
  it('should render', () => {
    const wrapper = shallow(<FormCreateUser />);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('FormControl').length).toBe(5);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
