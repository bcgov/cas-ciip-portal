import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationStatusItem} from 'containers/Applications/ApplicationStatusItemContainer';

describe('ApplicationStatusItem', () => {
  it('should render the application status', async () => {
    const applicationStatus = {
      applicationId: '123',
      applicationStatus: 'pending'
    };
    const r = shallow(
      <ApplicationStatusItem
        applicationStatus={applicationStatus}
        setApplicationStatus={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Bootstrap(DropdownToggle)').text()).toBe('pending');
  });
});
