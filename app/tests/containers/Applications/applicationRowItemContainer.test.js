import React from 'react';
import {wait, render} from '@testing-library/react';
import ApplicationRowItemContainer from '../../../containers/Applications/ApplicationRowItemContainer';

const application = {
  applicationId: '9',
  applicationStatus: 'pending',
  facilityName: 'facility1',
  operatorName: 'operator1',
  submissionDate: 'Sun, 17 Dec 1995 03:24:00 GMT'
};

describe('Application Row Item', () => {
  it('should render the application', async () => {
    const r = render(
      <table>
        <tbody>
          <ApplicationRowItemContainer application={application} />
        </tbody>
      </table>
    );
    await wait(() => r.getAllByText('facility1'));
    expect(r).toMatchSnapshot();
  });
});
