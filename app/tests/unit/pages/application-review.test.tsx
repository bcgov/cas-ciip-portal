import React from 'react';
import {shallow} from 'enzyme';
import {NextRouter} from 'next/router';
import ApplicationReview from 'pages/application-review';
const applicationRevisionStatus = 'SUBMITTED';
const router: Partial<NextRouter> = {
  asPath: '/application-review?application_id=1&reportingyear=2018&bcghgid=100',
  route: '/application-review',
  pathname: '/application-review',
  query: {
    applicationId: '1',
    reportingYear: '2018',
    bcghgid: '100'
  }
};
const query = {
  application: {
    rowId: 1,
    applicationRevisionStatus: {applicationRevisionStatus}
  }
};
it('It matches the last accepted Snapshot', () => {
  // @ts-ignore
  const wrapper = shallow(<ApplicationReview router={router} query={query} />);
  expect(wrapper).toMatchSnapshot();
});

it.skip('It receives the props for app_id, bcghgid and reporting year', () => {
  // @ts-ignore
  const wrapper = shallow(<ApplicationReview router={router} query={query} />);
  expect(
    wrapper
      .find('Relay(IncentiveCalculator)')
      .first()
      .prop('reportingYear')
  ).toBe(router.query.reportingYear);
  expect(
    wrapper
      .find('Relay(IncentiveCalculator)')
      .first()
      .prop('bcghgid')
  ).toBe(router.query.bcghgid);
});
