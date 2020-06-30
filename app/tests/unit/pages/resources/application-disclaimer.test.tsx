import React from 'react';
import {shallow} from 'enzyme';
import ApplicationDisclaimer from 'pages/resources/application-disclaimer';
import {applicationDisclaimerQueryResponse} from 'applicationDisclaimerQuery.graphql';

const query: applicationDisclaimerQueryResponse['query'] = {
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

describe('Program application-specific disclaimer page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <ApplicationDisclaimer query={query} router={router} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
