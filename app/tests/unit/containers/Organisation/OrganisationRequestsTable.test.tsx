import React from 'react';
import {shallow} from 'enzyme';
import {OrganisationRequestsTable_query} from '__generated__/OrganisationRequestsTable_query.graphql';
import {OrganisationRequestsTableComponent} from 'containers/Admin/OrganisationRequestsTable';

describe('Organisations', () => {
  it("should render the user's requested organisations", async () => {
    const query: OrganisationRequestsTable_query = {
      ' $refType': 'OrganisationRequestsTable_query',
      searchCiipUserOrganisation: {
        edges: [
          {
            node: {
              id: 'abc',
              ' $fragmentRefs': {
                OrganisationRequestsTableRow_userOrganisation: true
              }
            }
          }
        ]
      }
    };
    const r = shallow(
      <OrganisationRequestsTableComponent
        relay={null}
        handleEvent={jest.fn()}
        query={query}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('SearchTableLayoutComponent')).toBe(true);
  });
});
