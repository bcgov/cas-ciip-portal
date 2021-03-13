import React from 'react';
import {shallow} from 'enzyme';
import Reporter from 'pages/reporter/index';
import {reporterQueryResponse} from 'reporterQuery.graphql';

const query: reporterQueryResponse['query'] = {
  session: {
    ciipUserBySub: {
      id: 'ciip-reporter@mailinator.com',
      rowId: 6
    },
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  ' $fragmentRefs': {
    Organisations_query: true
  }
};

describe('Reporter Dashboard', () => {
  it('Should render properly', () => {
    const wrapper = shallow(<Reporter router={null} query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
});
