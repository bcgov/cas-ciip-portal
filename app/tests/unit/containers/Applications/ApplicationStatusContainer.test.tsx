import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationRevisionStatusComponent} from 'containers/Applications/ApplicationRevisionStatusContainer';

describe('ApplicationRevisionStatusItem', () => {
  it('should render the application status', async () => {
    const applicationRevisionStatus = {
      applicationRevisionStatus: 'pending'
    };
    const applicationRowId = 1;
    const r = shallow(
      <ApplicationRevisionStatusComponent
        relay={null}
        applicationRevisionStatus={applicationRevisionStatus}
        applicationRowId={applicationRowId}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
