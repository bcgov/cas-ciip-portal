import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationList} from 'containers/Applications/ApplicationListContainer';

describe('ApplicationList', () => {
  it('should render the application list', async () => {
    const query = {
      searchApplicationList: {
        edges: [{node: {id: 'ciip-application-1', rowId: '1'}}]
      }
    };
    const r = shallow(<ApplicationList query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.exists('SearchTableLayoutComponent')).toBe(true);
  });
});
