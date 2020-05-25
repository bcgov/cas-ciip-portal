import React from 'react';
import {shallow} from 'enzyme';
import CertifierRequests from 'pages/certifier/requests';
import {requestsQueryResponse} from 'requestsQuery.graphql';

const query: requestsQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  ' $fragmentRefs': {
    CertificationRequestsContainer_query: true
  }
};

describe('certifier requests list page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<CertifierRequests query={query} router={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('It passes a query to the CertificationRequestsContainer', () => {
    const wrapper = shallow(<CertifierRequests query={query} router={null} />);
    expect(wrapper.find('SearchTableComponent').prop('query')).toBe(query);
  });
});
