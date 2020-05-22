import React from 'react';
import {shallow} from 'enzyme';
import LoginRedirect from 'pages/login-redirect';
import {loginRedirectQueryResponse} from 'loginRedirectQuery.graphql';

const query: loginRedirectQueryResponse['query'] = {
  session: null,
  openedReportingYear: {
    applicationCloseTime: '2020-08-31 23:59:59.999-07'
  },
  nextReportingYear: {
    applicationCloseTime: '2021-12-30 14:49:54.191-08'
  }
};

describe('Login redirect page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<LoginRedirect query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('It passes an application deadline to the RegistrationLoginButtons component', () => {
    const wrapper = shallow(<LoginRedirect query={query} />);
    expect(
      wrapper
        .find('RegistrationLoginButtons')
        .first()
        .prop('applicationDeadline')
    ).toBe('August 31, 2020');
  });
});
