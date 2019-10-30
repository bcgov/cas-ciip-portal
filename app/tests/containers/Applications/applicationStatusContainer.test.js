import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationStatusContainer} from '../../../containers/Applications/ApplicationStatusContainer';

describe('ApplicationStatusContainer', () => {
  it('should render the application status', async () => {
    const query = {
      allApplicationStatuses: {
        edges: [{node: {id: '1'}}]
      }
    };
    const r = shallow(<ApplicationStatusContainer query={query} />);
    expect(r).toMatchSnapshot();
    expect(
      r.find('Relay(ApplicationStatusItemContainer)').prop('applicationStatus')
    ).toBe(query.allApplicationStatuses.edges[0].node);
  });

  it('should render empty edges as empty', async () => {
    const query = {
      allApplicationStatuses: {
        edges: []
      }
    };
    const r = shallow(<ApplicationStatusContainer query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.isEmptyRender()).toBe(true);
  });

  it('should render extra edges as empty', async () => {
    const query = {
      allApplicationStatuses: {
        edges: [{node: {id: '1'}}, {node: {id: '1'}}]
      }
    };
    const r = shallow(<ApplicationStatusContainer query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.isEmptyRender()).toBe(true);
  });
});
