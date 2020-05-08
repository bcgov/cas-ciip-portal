import React from 'react';
import {shallow} from 'enzyme';
import ReportingYearFormDialog from 'containers/Admin/ReportingYear/ReportingYearFormDialog';

describe('ReportingYearFormDialog', () => {
  it('Should match last accepted snapshot: no inputs disabled as all dates are in future', async () => {
    const formFields = {
      reportingYear: 2025,
      reportingPeriodStart: '2025-01-01T00:00:00-08:00',
      reportingPeriodEnd: '2025-12-31T00:00:00-08:00',
      applicationOpenTime: '2025-04-08T00:00:00-07:00',
      applicationCloseTime: '2026-03-01T00:00:00-08:00',
      applicationResponseTime: '2026-04-07T00:00:00-07:00'
    };

    const r = shallow(
      <ReportingYearFormDialog
        show
        formFields={formFields}
        year={formFields.reportingYear}
        clearForm={jest.fn()}
        saveReportingYear={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('Should match last accepted snapshot: some past dates are disabled', async () => {
    const formFields = {
      reportingYear: 2020,
      reportingPeriodStart: '2018-12-31T23:00:00-08:00',
      reportingPeriodEnd: '2029-12-31T22:59:59-08:00',
      applicationOpenTime: '2030-04-01T14:49:54.191757-07:00',
      applicationCloseTime: '2030-12-30T13:49:54.191757-08:00',
      applicationResponseTime: '2031-01-30T13:49:54.191757-08:00'
    };

    const r = shallow(
      <ReportingYearFormDialog
        show
        formFields={formFields}
        year={formFields.reportingYear}
        clearForm={jest.fn()}
        saveReportingYear={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
