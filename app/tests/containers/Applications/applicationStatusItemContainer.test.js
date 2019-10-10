import React from 'react';
// Import {wait, render} from '@testing-library/react';
import {shallow} from 'enzyme';
import ApplicationStatusItemContainer from '../../../containers/Applications/ApplicationStatusItemContainer';

const application = {
  applicationStatus: 'pending',
  displayStatus: 'Pending'
};

describe('Application Status UPdate', () => {
  it('should render the application status', async () => {
    const r = shallow(
      <ApplicationStatusItemContainer
        applicationStatus={application.applicationStatus}
        displayStatus={application.displayStatus}
        setApplicationStatus={jest.fn()}
      />
    );
    expect(r.find('Bootstrap(DropdownToggle)').text()).toBe('pending');
  });
});
