import React from 'react';
import {shallow} from 'enzyme';
import Contact from 'pages/resources/contact';
import {contactQueryResponse} from 'contactQuery.graphql';

const query: contactQueryResponse['query'] = {
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

describe('Contact page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <Contact query={query} router={router} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
