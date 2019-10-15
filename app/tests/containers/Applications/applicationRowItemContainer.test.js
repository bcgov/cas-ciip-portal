import React from 'react';
import {wait, render} from '@testing-library/react';
import {ApplicationRowItemContainer} from '../../../containers/Applications/ApplicationRowItemContainer';

describe('ApplicationRowItemContainer', () => {
  it('should render the application', async () => {
    const ciipApplication = {
      applicationId: '9',
      applicationStatus: 'pending',
      facilityName: 'facility1',
      operatorName: 'operator1',
      submissionDate: 'Sun, 17 Dec 1995 03:24:00 GMT'
    };
    const r = render(
      <table>
        <tbody>
          <ApplicationRowItemContainer ciipApplication={ciipApplication} />
        </tbody>
      </table>
    );
    expect(r).toMatchSnapshot();
    await wait(() => r.getAllByText('facility1'));
  });
});
