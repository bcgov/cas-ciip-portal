import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationListContainer} from '../../../containers/Applications/ApplicationListContainer';

describe('ApplicationListContainer', () => {
  it('should render the application list', async () => {
    const query = {
      searchApplicationList: {
        edges: [{node: {id: 'ciip-application-1'}}]
      }
    };
    const r = shallow(<ApplicationListContainer query={query} />);
    expect(r).toMatchSnapshot();
    expect(
      r
        .find('ForwardRef(Relay(ApplicationRowItemContainer))')
        .prop('ciipApplication')
    ).toBe(query.searchApplicationList.edges[0].node);
  });
});
