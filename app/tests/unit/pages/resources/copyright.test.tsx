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

describe('BCGov core copyright page', () => {
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Copyright query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
});
