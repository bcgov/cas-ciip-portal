import React from 'react';
import {shallow} from 'enzyme';
import LoginRedirect from 'pages/login-redirect';
import {loginRedirectQueryResponse} from 'loginRedirectQuery.graphql';

const query: loginRedirectQueryResponse['query'] = {
  session: null,
  ' $fragmentRefs': {RegistrationLoginButtons_query: true}
};

describe('Login redirect page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<LoginRedirect query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('It passes the relay query response to the RegistrationLoginButtons component', () => {
    const wrapper = shallow(<LoginRedirect query={query} />);
    expect(
      wrapper
        .find('Relay(RegistrationLoginButtonsComponent)')
        .first()
        .prop('query')
    ).toBe(query);
  });
});
