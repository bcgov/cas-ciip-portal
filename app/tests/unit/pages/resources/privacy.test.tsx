import React from 'react';
import {shallow} from 'enzyme';
import Privacy from 'pages/resources/privacy';
import {privacyQueryResponse} from 'privacyQuery.graphql';

const query: privacyQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  }
};

describe('BCGov core privacy page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Privacy query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
});
