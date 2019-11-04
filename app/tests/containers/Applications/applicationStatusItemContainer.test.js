import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationStatusItemContainer} from '../../../containers/Applications/ApplicationStatusItemContainer';

describe('ApplicationStatusItemContainer', () => {
  it('should render the application status', async () => {
    const applicationStatus = {
      applicationId: '123',
      applicationStatus: 'pending'
    };
    const r = shallow(
      <ApplicationStatusItemContainer
        applicationStatus={applicationStatus}
        setApplicationStatus={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Bootstrap(DropdownToggle)').text()).toBe('pending');
  });
});
