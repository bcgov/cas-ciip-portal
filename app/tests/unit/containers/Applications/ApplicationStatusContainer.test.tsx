import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationRevisionStatusComponent} from 'containers/Applications/ApplicationRevisionStatusContainer';

describe('ApplicationRevisionStatusItem', () => {
  it('should render the application status in a dropdown if isCurrentVersion is true', async () => {
    const applicationRevisionStatus = {
      applicationRevisionStatus: 'SUBMITTED',
      versionNumber: 1,
      applicationRevisionByApplicationIdAndVersionNumber: {
        isCurrentVersion: true
      }
    };
    const applicationRowId = 1;
    const r = shallow(
      <ApplicationRevisionStatusComponent
        relay={null}
        applicationRevisionStatus={applicationRevisionStatus}
        applicationRowId={applicationRowId}
      />
    );
    expect(r.exists('Dropdown')).toBe(true);
    expect(r.find('DropdownToggle').text()).toBe('SUBMITTED');
    expect(r).toMatchSnapshot();
  });

  it('should render the application status in a disabled button if isCurrentVersion is false', async () => {
    const applicationRevisionStatus = {
      applicationRevisionStatus: 'SUBMITTED',
      versionNumber: 1,
      applicationRevisionByApplicationIdAndVersionNumber: {
        isCurrentVersion: false
      }
    };
    const applicationRowId = 1;
    const r = shallow(
      <ApplicationRevisionStatusComponent
        relay={null}
        applicationRevisionStatus={applicationRevisionStatus}
        applicationRowId={applicationRowId}
      />
    );
    expect(r.exists('Dropdown')).toBe(false);
    expect(r.find('Button').at(2).props().disabled).toBe(true);
    expect(r).toMatchSnapshot();
  });
});
