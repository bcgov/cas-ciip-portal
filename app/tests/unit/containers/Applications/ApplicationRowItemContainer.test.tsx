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
      applicationRevisionStatus: 'SUBMITTED',
      reportingYear: 2018,
      bcghgid: 123456789,
      submissionDate: '2020-09-02T11:14:08.254553-07:00',
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
