import React from 'react';
import {shallow} from 'enzyme';
import Copyright from 'pages/resources/copyright';
import {copyrightQueryResponse} from 'copyrightQuery.graphql';

const query: copyrightQueryResponse['query'] = {
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

describe('BCGov core copyright page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Copyright query={query} router={router} />);
    expect(wrapper).toMatchSnapshot();
  });
});
