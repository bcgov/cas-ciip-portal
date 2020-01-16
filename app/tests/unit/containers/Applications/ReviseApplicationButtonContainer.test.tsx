import React from 'react';
import {shallow} from 'enzyme';
import {ReviseApplicationButton} from 'containers/Applications/ReviseApplicationButtonContainer';

describe('The ReviseApplicationButton', () => {
  it('should render an button if the application window is open', () => {
    const r = shallow(
      <ReviseApplicationButton
        relay={null}
        application={{
          ' $refType': 'ReviseApplicationButtonContainer_application',
          id: 'foo',
          rowId: 1,
          latestSubmittedRevision: {
            versionNumber: 1
          }
        }}
        query={{
          ' $refType': 'ReviseApplicationButtonContainer_query',
          openedReportingYear: {
            reportingYear: 2018
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('Revise Application');
  });

  it('should render a disabled button if the application window is closed', () => {
    const r = shallow(
      <ReviseApplicationButton
        relay={null}
        application={{
          ' $refType': 'ReviseApplicationButtonContainer_application',
          id: 'foo',
          rowId: 1,
          latestSubmittedRevision: {
            versionNumber: 1
          }
        }}
        query={{
          ' $refType': 'ReviseApplicationButtonContainer_query',
          openedReportingYear: {
            reportingYear: null
          }
        }}
      />
    );

    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').prop('disabled')).toBe(true);
    expect(r.find('Button').text()).toBe('Application window closed');
  });
});
