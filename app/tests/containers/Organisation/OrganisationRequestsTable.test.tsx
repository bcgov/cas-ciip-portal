import React from 'react';
import {shallow} from 'enzyme';
import {OrganisationRequestsTableComponent} from '../../../containers/Admin/OrganisationRequestsTable';

describe('Organisations', () => {
  it("should render the user's requested organisations", async () => {
    const query = {
      searchUserOrganisation: {
        edges: [
          {
            node: {
              id: 1,
              status: 'APPROVED'
            }
          }
        ]
      }
    };
    // @ts-ignore
    const r = shallow(<OrganisationRequestsTableComponent query={query} />);
    expect(r).toMatchSnapshot();
    expect(
      r
        .find('Relay(OrganisationRequestsTableRowComponent)')
        .prop('userOrganisation')
    ).toBe(query.searchUserOrganisation.edges[0].node);
  });
});
