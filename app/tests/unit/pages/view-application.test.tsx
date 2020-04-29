import React from 'react';
import {shallow} from 'enzyme';
import ViewApplication from 'pages/reporter/view-application';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';

const query: viewApplicationQueryResponse['query'] = {
  ' $fragmentRefs': {
    ApplicationDetailsContainer_query: true,
    ReviseApplicationButtonContainer_query: true
  },
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  application: {
    applicationRevisionStatus: {
      applicationRevisionStatus: 'SUBMITTED'
    },
    ' $fragmentRefs': {
      ReviseApplicationButtonContainer_application: true,
      ApplicationDetailsContainer_application: true
    },
    orderedFormResults: {
      edges: [
        {
          node: {
            id: 'abc',
            ' $fragmentRefs': {
              ApplicationCommentsContainer_formResult: true
            }
          }
        }
      ]
    }
  }
};

// It matches the last accepted Snapshot
it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<ViewApplication query={query} router={null} />);
  expect(wrapper).toMatchSnapshot();
});

it('It passes a query to the ApplicationDetailsComponent component', () => {
  const wrapper = shallow(<ViewApplication query={query} router={null} />);
  expect(
    wrapper.find('Relay(ApplicationDetailsComponent)').first().prop('query')
  ).toBe(query);
});
