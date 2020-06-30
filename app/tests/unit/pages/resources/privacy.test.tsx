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

const router = {
  query: {
    applicationId: 'skjdh839',
    hasSwrsReport: true,
    version: 1
  }
};

describe('BCGov core privacy page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <Privacy query={query} router={router} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
