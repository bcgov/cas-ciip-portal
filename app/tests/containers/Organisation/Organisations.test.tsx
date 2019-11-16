import React from 'react';
import {shallow} from 'enzyme';
import {Organisations_query} from 'Organisations_query.graphql';
import {OrganisationsComponent} from '../../../containers/Organisations/Organisations';

describe('Organisations', () => {
  it('should render no organisations if the user has not requested any access', async () => {
    const query: Organisations_query = {
      ' $refType': 'Organisations_query',
      session: {
        ciipUserBySub: {
          id: '',
          ciipUserOrganisationsByUserId: {edges: []}
        }
      },
      allOrganisations: {edges: []}
    };
    const r = shallow(
      <OrganisationsComponent
        query={query}
        relay={null}
        orgInput={null}
        selectedOrg={null}
        confirmOrg={null}
        handleInputChange={null}
        handleContextChange={null}
        handleOrgChange={null}
        handleOrgConfirm={null}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it("should render the user's requested organisations", async () => {
    const query: Organisations_query = {
      ' $refType': 'Organisations_query',
      session: {
        ciipUserBySub: {
          id: '',
          ciipUserOrganisationsByUserId: {
            edges: [
              {
                node: {
                  id: 'OrgId',
                  ' $fragmentRefs': {UserOrganisation_userOrganisation: true}
                }
              }
            ]
          }
        }
      },
      allOrganisations: {
        edges: []
      }
    };
    const r = shallow(
      <OrganisationsComponent
        query={query}
        relay={null}
        orgInput={null}
        selectedOrg={null}
        confirmOrg={null}
        handleInputChange={null}
        handleContextChange={null}
        handleOrgChange={null}
        handleOrgConfirm={null}
      />
    );
    expect(r).toMatchSnapshot();
    expect(
      r.find('Relay(UserOrganisationComponent)').prop('userOrganisation')
    ).toBe(
      query.session.ciipUserBySub.ciipUserOrganisationsByUserId.edges[0].node
    );
  });
});
