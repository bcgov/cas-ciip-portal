import React from 'react';
import {ApplicationStatusSearchOption} from 'components/Search/ApplicationStatusSearchOption';
import {mount} from 'enzyme';

describe('The ApplicationStatusSearchOption', () => {
  describe('Component property', () => {
    const filter = new ApplicationStatusSearchOption(
      'myDisplayName',
      'myArgName',
      'myNullValueArgName'
    );

    it('should render a select element with the possible application statuses', () => {
      const wrapper = mount(
        <filter.Component filterArgs={{}} onChange={jest.fn()} />
      );
      const statuses = [
        'NOT_STARTED',
        'DRAFT',
        'SUBMITTED',
        'REQUESTED_CHANGES',
        'APPROVED',
        'REJECTED'
      ];
      statuses.forEach((status) => {
        expect(wrapper.find(`option[value="${status}"]`)).toHaveLength(1);
      });

      expect(wrapper).toMatchSnapshot();
    });

    it('should trigger onChange with the nullValueArgName to true, and argName to undefined when selecting "Not started"', () => {
      const handleChange = jest.fn();
      const wrapper = mount(
        <filter.Component filterArgs={{}} onChange={handleChange} />
      );

      wrapper
        .find('select')
        .first()
        .simulate('change', {target: {value: 'NOT_STARTED'}});

      expect(handleChange).toBeCalledTimes(2);
      expect(handleChange).toBeCalledWith(true, 'myNullValueArgName');
      expect(handleChange).toBeCalledWith(undefined, 'myArgName');
    });

    it('should trigger onChange with the nullValueArgName to null, and argName to the selected value when selecting a value other than "Not started"', () => {
      const handleChange = jest.fn();
      const wrapper = mount(
        <filter.Component filterArgs={{}} onChange={handleChange} />
      );

      wrapper
        .find('select')
        .first()
        .simulate('change', {target: {value: 'DRAFT'}});

      expect(handleChange).toBeCalledTimes(2);
      expect(handleChange).toBeCalledWith(undefined, 'myNullValueArgName');
      expect(handleChange).toBeCalledWith('DRAFT', 'myArgName', filter.toUrl);

      handleChange.mockReset();

      wrapper
        .find('select')
        .first()
        .simulate('change', {target: {value: 'REQUESTED_CHANGES'}});

      expect(handleChange).toBeCalledTimes(2);
      expect(handleChange).toBeCalledWith(undefined, 'myNullValueArgName');
      expect(handleChange).toBeCalledWith(
        'REQUESTED_CHANGES',
        'myArgName',
        filter.toUrl
      );

      handleChange.mockReset();

      wrapper
        .find('select')
        .first()
        .simulate('change', {target: {value: ''}});

      expect(handleChange).toBeCalledTimes(2);
      expect(handleChange).toBeCalledWith(undefined, 'myNullValueArgName');
      expect(handleChange).toBeCalledWith('', 'myArgName', filter.toUrl);
    });
  });
});