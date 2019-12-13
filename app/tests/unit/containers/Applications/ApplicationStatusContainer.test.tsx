import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationStatusComponent} from 'containers/Applications/ApplicationStatusContainer';

describe('ApplicationStatusItem', () => {
  it('should render the application status', async () => {
    const applicationStatus = {
      applicationStatus: 'pending'
    };
    const applicationRowId = 1;
    const r = shallow(
      <ApplicationStatusComponent
        relay={null}
        applicationStatus={applicationStatus}
        applicationRowId={applicationRowId}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
