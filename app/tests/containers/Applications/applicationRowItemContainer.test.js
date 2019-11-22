import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationRowItem} from '../../../containers/Applications/ApplicationRowItemContainer';

describe('ApplicationRowItem', () => {
  it('should render the application', () => {
    const ciipApplication = {
      rowId: '9',
      applicationByRowId: {id: 'ABC'},
      applicationStatus: 'pending',
      facilityName: 'facility1',
      operatorName: 'operator1',
      submissionDate: 'Sun, 17 Dec 1995 03:24:00 GMT'
    };
    const render = shallow(
      <ApplicationRowItem ciipApplication={ciipApplication} />
    );
    expect(render).toMatchSnapshot();
  });
});
