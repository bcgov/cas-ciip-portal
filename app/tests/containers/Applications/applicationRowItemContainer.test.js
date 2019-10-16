import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationRowItemContainer} from '../../../containers/Applications/ApplicationRowItemContainer';

describe('ApplicationRowItemContainer', () => {
  it('should render the application', () => {
    const ciipApplication = {
      applicationId: '9',
      applicationStatus: 'pending',
      facilityName: 'facility1',
      operatorName: 'operator1',
      submissionDate: 'Sun, 17 Dec 1995 03:24:00 GMT'
    };
    const render = shallow(
      <ApplicationRowItemContainer ciipApplication={ciipApplication} />
    );
    expect(render).toMatchSnapshot();
  });
});
