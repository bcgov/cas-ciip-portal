import React from 'react';
import {shallow} from 'enzyme';
import {NextRouter} from 'next/router';
import ApplicationDetails from '../../pages/application-details';

// @ts-ignore
const router: NextRouter = {
  asPath:
    '/application-details?application_id=1&reportingyear=2018&bcghgid=100',
  route: '/application-details',
  pathname: '/application-details',
  query: {applicationId: '1', reportingYear: '2018', bcghgid: '100'}
};

it('It matches the last accepted Snapshot', () => {
  // @ts-ignore
  const wrapper = shallow(<ApplicationDetails router={router} />);
  expect(wrapper).toMatchSnapshot();
});

it('It receives the props for app_id, bcghgid and reporting year', () => {
  // @ts-ignore
  const wrapper = shallow(<ApplicationDetails router={router} />);
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
