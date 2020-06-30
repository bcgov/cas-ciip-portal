import React from 'react';
import {shallow} from 'enzyme';
import Disclaimer from 'pages/resources/disclaimer';
import {disclaimerQueryResponse} from 'disclaimerQuery.graphql';

const query: disclaimerQueryResponse['query'] = {
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

describe('BCGov core disclaimer page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <Disclaimer query={query} router={router} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
