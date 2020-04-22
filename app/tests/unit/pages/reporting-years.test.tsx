import React from 'react';
import {shallow} from 'enzyme';
import ReportingYears from 'pages/admin/reporting-years';
import {reportingYearsQueryResponse} from 'reportingYearsQuery.graphql';

const query: reportingYearsQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  ' $fragmentRefs': {
    ReportingYearTable_query: true
  }
};

describe('admin', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<ReportingYears query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('It passes a query to the ReportingYearTable component', () => {
    const wrapper = shallow(<ReportingYears query={query} />);
    expect(
      wrapper.find('Relay(ReportingYearTableComponent)').first().prop('query')
    ).toBe(query);
  });
});
