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

describe('Contact page', () => {
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Contact query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
});
