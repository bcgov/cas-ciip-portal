import React from 'react';
import {shallow} from 'enzyme';
import LoginRedirect from 'pages/login-redirect';
import {loginRedirectQueryResponse} from 'loginRedirectQuery.graphql';

const query: loginRedirectQueryResponse['query'] = {
  session: null,
  ' $fragmentRefs': {RegistrationLoginButtons_query: true}
};

describe('Login redirect page', () => {
  it('matches the last accepted Snapshot', () => {
    const router: any = {query: {}};
    const wrapper = shallow(<LoginRedirect query={query} router={router} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes the relay query response to the RegistrationLoginButtons component', () => {
    const router: any = {query: {}};
    const wrapper = shallow(<LoginRedirect query={query} router={router} />);
    expect(
      wrapper
        .find('Relay(RegistrationLoginButtonsComponent)')
        .first()
        .prop('query')
    ).toBe(query);
  });

  it('tell the user when they were logged out due to inactivity', () => {
    const router: any = {query: {sessionIdled: true}};
    const wrapper = shallow(<LoginRedirect query={query} router={router} />);
    expect(wrapper.find('h3').first().text()).toBe(
      'You were logged out due to inactivity.'
    );
  });
});
