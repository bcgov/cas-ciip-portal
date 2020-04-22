import React from 'react';
import {shallow} from 'enzyme';
import NewReportingYearFormDialog from 'containers/Admin/ReportingYear/NewReportingYearFormDialog';

describe('NewReportingYearFormDialog', () => {
  it('Should match last accepted snapshot', async () => {
    const r = shallow(
      <NewReportingYearFormDialog
        show
        clearForm={jest.fn()}
        createReportingYear={jest.fn()}
        existingYearKeys={[2019, 2020]}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
