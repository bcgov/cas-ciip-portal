import React from 'react';
import {mount} from 'enzyme';
import ApplicationDetails from '../../pages/application-details';

const router = {
  asPath:
    '/application-details?application_id=1&reportingyear=2018&bcghgid=100',
  route: '/application-details',
  pathname: '/application-details',
  query: {application_id: '1', reportingyear: '2018', bcghgid: '100'}
};

it('It matches the last accepted Snapshot', () => {
  const wrapper = mount(<ApplicationDetails router={router} />);
  expect(wrapper).toMatchSnapshot();
});

it('It renders the iFrame with metabase', () => {
  const wrapper = mount(<ApplicationDetails router={router} />);
  expect(
    wrapper.containsMatchingElement(
      <iframe
        frameBorder="0"
        height="1000"
        src="http://metabase-wksv3k-test.pathfinder.gov.bc.ca/public/dashboard/e5c89425-e6c1-489b-9329-a7ab68e44d8f?application_id=1&reportingyear=2018&bcghgid=100"
        width="100%"
      />
    )
  ).toBeTruthy();
});

it('It receives the props for app_id, bcghgid and reporting year', () => {
  const wrapper = mount(<ApplicationDetails router={router} />);
  expect(wrapper.props().router.query.application_id).toEqual('1');
  expect(wrapper.props().router.query.reportingyear).toEqual('2018');
  expect(wrapper.props().router.query.bcghgid).toEqual('100');
});

// It renders the metabase widgets
