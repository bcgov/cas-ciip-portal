import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationRowItem} from 'containers/Applications/ApplicationRowItemContainer';

describe('ApplicationRowItem', () => {
  it('should render the application', () => {
    const applicationSearchResult = {
      rowId: 1,
      applicationId: 'abc',
      operatorName: 'blah',
      facilityName: 'foo',
      applicationRevisionStatus: 'PENDING',
      reportingYear: 2018,
      bcghgid: 123456789,
      submissionDate: 'Monday',
      applicationByApplicationId: {
        id: 'abc',
        latestSubmittedRevision: {
          versionNumber: 1
        }
      }
    };
    const render = shallow(
      <ApplicationRowItem applicationSearchResult={applicationSearchResult} />
    );
    expect(render).toMatchSnapshot();
  });
});
