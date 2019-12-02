import React from 'react';
import {shallow} from 'enzyme';
import {NextRouter} from 'next/router';
import ApplicationReview from 'pages/application-review';
const applicationStatus = 'pending';
const router: Partial<NextRouter> = {
  asPath: '/application-review?application_id=1&reportingyear=2018&bcghgid=100',
  route: '/application-review',
  pathname: '/application-review',
  query: {
    applicationId: '1',
    reportingYear: '2018',
    bcghgid: '100',
    application: {rowId: 1, applicationStatus: {applicationStatus}}
  }
};

it('It matches the last accepted Snapshot', () => {
  // @ts-ignore
  const wrapper = shallow(<ApplicationReview router={router} />);
  expect(wrapper).toMatchSnapshot();
});

it('It receives the props for app_id, bcghgid and reporting year', () => {
  // @ts-ignore
  const wrapper = shallow(<ApplicationReview router={router} />);
  expect(
    wrapper
      .find('Relay(ApplicationStatus)')
      .first()
      .prop('applicationId')
  ).toBe(router.query.applicationId);
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
