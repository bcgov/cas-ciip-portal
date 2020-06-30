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

describe('BCGov core disclaimer page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Disclaimer query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
});
